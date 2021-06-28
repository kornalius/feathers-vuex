import { globalModels, prepareAddModel } from './global-models'
import { mergeWithAccessors, checkNamespace, getId } from '../utils'
import _merge from 'lodash/merge'
import _get from 'lodash/get'
import { EventEmitter } from 'events'
const defaultOptions = {
  clone: false,
  commit: true,
  merge: true
}
/** Ensures value has EventEmitter instance props */
function assertIsEventEmitter(val) {
  if (
    !Object.keys(EventEmitter.prototype).every((eeKey) =>
      Object.prototype.hasOwnProperty.call(val, eeKey)
    )
  ) {
    throw new Error(`Expected EventEmitter, but got ${val}`)
  }
}
/**
 *
 * @param options
 */
export default function makeBaseModel(options) {
  const addModel = prepareAddModel(options)
  const { serverAlias } = options
  // If this serverAlias already has a BaseModel, return it
  const ExistingBaseModel = _get(globalModels, [serverAlias, 'BaseModel'])
  if (ExistingBaseModel) {
    return ExistingBaseModel
  }
  class BaseModel {
    constructor(data, options) {
      // You have to pass at least an empty object to get a tempId.
      data = data || {}
      options = Object.assign({}, defaultOptions, options)
      const {
        store,
        keepCopiesInStore,
        copiesById: copiesByIdOnModel,
        models,
        instanceDefaults,
        idField,
        tempIdField,
        setupInstance,
        getFromStore,
        namespace,
        _commit
      } = this.constructor
      const id = getId(data, idField)
      const hasValidId = id !== null && id !== undefined
      const tempId =
        data && data.hasOwnProperty(tempIdField) ? data[tempIdField] : undefined
      const hasValidTempId = tempId !== null && tempId !== undefined
      const copiesById = keepCopiesInStore
        ? store.state[namespace].copiesById
        : copiesByIdOnModel
      const existingItem =
        hasValidId && !options.clone
          ? getFromStore.call(this.constructor, id)
          : null
      // If it already exists, update the original and return
      if (existingItem) {
        data = setupInstance.call(this, data, { models, store }) || data
        _commit.call(this.constructor, 'mergeInstance', data)
        return existingItem
      }
      // If cloning and a clone already exists, update and return the original clone. Only one clone is allowed.
      const existingClone =
        (hasValidId || hasValidTempId) && options.clone
          ? copiesById[id] || copiesById[tempId]
          : null
      if (existingClone) {
        // This must be done in a mutation to avoid Vuex errors.
        _commit.call(this.constructor, 'merge', {
          dest: existingClone,
          source: data
        })
        return existingClone
      }
      // Mark as a clone
      if (options.clone) {
        Object.defineProperty(this, '__isClone', {
          value: true,
          enumerable: false
        })
      }
      // Setup instanceDefaults
      if (instanceDefaults && typeof instanceDefaults === 'function') {
        const defaults =
          instanceDefaults.call(this, data, { models, store }) || data
        mergeWithAccessors(this, defaults)
      }
      // Handles Vue objects or regular ones. We can't simply assign or return
      // the data due to how Vue wraps everything into an accessor.
      if (options.merge !== false) {
        mergeWithAccessors(
          this,
          setupInstance.call(this, data, { models, store }) || data
        )
      }
      // Add the item to the store
      if (!options.clone && options.commit !== false && store) {
        _commit.call(this.constructor, 'addItem', this)
      }
      return this
    }
    // eslint-disable-next-line
    static instanceDefaults(data, ctx) {
      return data
    }
    // eslint-disable-next-line
    static setupInstance(data, ctx) {
      return data
    }
    static diffOnPatch(data) {
      return data
    }
    /**
     * Calls `getter`, passing this model's ID as the parameter
     * @param getter name of getter to call
     */
    getGetterWithId(getter) {
      const { _getters, idField, tempIdField } = this.constructor
      const id =
        getId(this, idField) != null ? getId(this, idField) : this[tempIdField]
      return _getters.call(this.constructor, getter, id)
    }
    get isCreatePending() {
      return this.getGetterWithId('isCreatePendingById')
    }
    get isUpdatePending() {
      return this.getGetterWithId('isUpdatePendingById')
    }
    get isPatchPending() {
      return this.getGetterWithId('isPatchPendingById')
    }
    get isRemovePending() {
      return this.getGetterWithId('isRemovePendingById')
    }
    get isSavePending() {
      return this.getGetterWithId('isSavePendingById')
    }
    get isPending() {
      return this.getGetterWithId('isPendingById')
    }
    static getId(record) {
      const { idField } = this.constructor
      return getId(record, idField)
    }
    static find(params) {
      return this._dispatch('find', params)
    }
    static findInStore(params) {
      return this._getters('find', params)
    }
    static count(params) {
      return this._dispatch('count', params)
    }
    static countInStore(params) {
      return this._getters('count', params)
    }
    static get(id, params) {
      if (params) {
        return this._dispatch('get', [id, params])
      } else {
        return this._dispatch('get', id)
      }
    }
    static getFromStore(id, params) {
      return this._getters('get', id, params)
    }
    /**
     * An alias for store.getters. Can only call function-based getters, since
     * it's meant for only `find` and `get`.
     * @param method the vuex getter name without the namespace
     * @param payload if provided, the getter will be called as a function
     */
    static _getters(name, idOrParams, params) {
      const { namespace, store } = this
      if (checkNamespace(namespace, this, options.debug)) {
        if (!store.getters.hasOwnProperty(`${namespace}/${name}`)) {
          throw new Error(`Could not find getter named ${namespace}/${name}`)
        }
        return store.getters[`${namespace}/${name}`](idOrParams, params)
      }
    }
    /**
     * An alias for store.commit
     * @param method the vuex mutation name without the namespace
     * @param payload the payload for the mutation
     */
    static _commit(method, payload) {
      const { namespace, store } = this
      if (checkNamespace(namespace, this, options.debug)) {
        store.commit(`${namespace}/${method}`, payload)
      }
    }
    /**
     * An alias for store.dispatch
     * @param method the vuex action name without the namespace
     * @param payload the payload for the action
     */
    static _dispatch(method, payload) {
      const { namespace, store } = this
      if (checkNamespace(namespace, this, options.debug)) {
        return store.dispatch(`${namespace}/${method}`, payload)
      }
    }
    /**
     * make the server side documents hydrated on client a FeathersVuexModel
     */
    static hydrateAll() {
      const { namespace, store } = this
      const state = store.state[namespace]
      const commit = store.commit
      // Replace each plain object with a model instance.
      Object.keys(state.keyedById).forEach((id) => {
        const record = state.keyedById[id]
        commit(`${namespace}/removeItem`, record)
        commit(`${namespace}/addItem`, record)
      })
    }
    /**
     * clone the current record using the `createCopy` mutation
     */
    clone(data) {
      const { idField, tempIdField } = this.constructor
      if (this.__isClone) {
        throw new Error('You cannot clone a copy')
      }
      const id =
        getId(this, idField) != null ? getId(this, idField) : this[tempIdField]
      return this._clone(id, data)
    }
    _clone(id, data = {}) {
      const { store, namespace, _commit, _getters } = this.constructor
      const { keepCopiesInStore } = store.state[namespace]
      _commit.call(this.constructor, `createCopy`, id)
      if (keepCopiesInStore) {
        return Object.assign(
          _getters.call(this.constructor, 'getCopyById', id),
          data
        )
      } else {
        // const { copiesById } = this.constructor as typeof BaseModel
        return Object.assign(this.constructor.copiesById[id], data)
      }
    }
    /**
     * Reset a clone to match the instance in the store.
     */
    reset() {
      const { idField, tempIdField, _commit } = this.constructor
      if (this.__isClone) {
        const id =
          getId(this, idField) != null
            ? getId(this, idField)
            : this[tempIdField]
        _commit.call(this.constructor, 'resetCopy', id)
        return this
      } else {
        throw new Error('You cannot reset a non-copy')
      }
    }
    /**
     * Update a store instance to match a clone.
     */
    commit() {
      const { idField, tempIdField, _commit, _getters } = this.constructor
      if (this.__isClone) {
        const id =
          getId(this, idField) != null
            ? getId(this, idField)
            : this[tempIdField]
        _commit.call(this.constructor, 'commitCopy', id)
        return _getters.call(this.constructor, 'get', id)
      } else {
        throw new Error('You cannot call commit on a non-copy')
      }
    }
    /**
     * A shortcut to either call create or patch/update
     * @param params
     */
    save(params) {
      const { idField, preferUpdate } = this.constructor
      const id = getId(this, idField)
      if (id != null) {
        return preferUpdate ? this.update(params) : this.patch(params)
      } else {
        return this.create(params)
      }
    }
    /**
     * Calls service create with the current instance data
     * @param params
     */
    create(params) {
      const { _dispatch } = this.constructor
      const data = Object.assign({}, this)
      if (data[options.idField] === null) {
        delete data[options.idField]
      }
      return _dispatch.call(this.constructor, 'create', [data, params])
    }
    /**
     * Calls service patch with the current instance data
     * @param params
     */
    patch(params) {
      const { idField, _dispatch } = this.constructor
      const id = getId(this, idField)
      if (id == null) {
        const error = new Error(
          `Missing ${idField} property. You must create the data before you can patch with this data`
        )
        return Promise.reject(error)
      }
      return _dispatch.call(this.constructor, 'patch', [id, this, params])
    }
    /**
     * Calls service update with the current instance data
     * @param params
     */
    update(params) {
      const { idField, _dispatch } = this.constructor
      const id = getId(this, idField)
      if (id !== 0 && !id) {
        const error = new Error(
          `Missing ${idField} property. You must create the data before you can update with this data`
        )
        return Promise.reject(error)
      }
      return _dispatch.call(this.constructor, 'update', [id, this, params])
    }
    /**
     * Calls service remove with the current instance id
     * @param params
     */
    remove(params) {
      const { idField, tempIdField, _dispatch, _commit } = this.constructor
      const id = getId(this, idField)
      if (id != null) {
        if (params && params.eager) {
          _commit.call(this.constructor, 'removeItem', id)
        }
        return _dispatch.call(this.constructor, 'remove', [id, params])
      } else {
        // is temp
        _commit.call(this.constructor, 'removeTemps', [this[tempIdField]])
        _commit.call(this.constructor, 'clearCopy', [this[tempIdField]])
        return Promise.resolve(this)
      }
    }
    toJSON() {
      return _merge({}, this)
    }
  }
  BaseModel.keepCopiesInStore = options.keepCopiesInStore
  BaseModel.idField = options.idField
  BaseModel.tempIdField = options.tempIdField
  BaseModel.preferUpdate = options.preferUpdate
  BaseModel.serverAlias = options.serverAlias
  BaseModel.models = globalModels // Can access other Models here
  BaseModel.copiesById = {}
  BaseModel.merge = mergeWithAccessors
  BaseModel.modelName = 'BaseModel'
  for (const n in EventEmitter.prototype) {
    BaseModel[n] = EventEmitter.prototype[n]
  }
  addModel(BaseModel)
  const BaseModelEventEmitter = BaseModel
  assertIsEventEmitter(BaseModelEventEmitter)
  return BaseModelEventEmitter
}
