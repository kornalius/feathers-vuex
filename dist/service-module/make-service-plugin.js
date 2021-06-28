import makeServiceModule from './make-service-module'
import { globalModels, prepareAddModel } from './global-models'
import enableServiceEvents from './service-module.events'
import { makeNamespace, getServicePath, assignIfNotPresent } from '../utils'
import _get from 'lodash/get'
const defaults = {
  namespace: '',
  servicePath: '',
  extend: ({ module }) => module,
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  instanceDefaults: () => ({}),
  setupInstance: (instance) => instance,
  debounceEventsMaxWait: 1000
}
const events = ['created', 'patched', 'updated', 'removed']
/**
 * prepare only wraps the makeServicePlugin to provide the globalOptions.
 * @param globalOptions
 */
export default function prepareMakeServicePlugin(globalOptions) {
  const addModel = prepareAddModel(globalOptions)
  /**
   * (1) Make a Vuex plugin for the provided service.
   * (2a) Attach the vuex store to the BaseModel.
   * (2b) If the Model does not extend the BaseModel, monkey patch it, too
   * (3) Setup real-time events
   */
  return function makeServicePlugin(config) {
    if (!config.service) {
      throw new Error(
        'No service was provided. If you passed one in, check that you have configured a transport plugin on the Feathers Client. Make sure you use the client version of the transport.'
      )
    }
    const options = Object.assign({}, defaults, globalOptions, config)
    const {
      Model,
      service,
      namespace,
      nameStyle,
      instanceDefaults,
      setupInstance,
      preferUpdate
    } = options
    if (globalOptions.handleEvents && options.handleEvents) {
      options.handleEvents = Object.assign(
        {},
        globalOptions.handleEvents,
        options.handleEvents
      )
    }
    events.forEach((eventName) => {
      if (!options.handleEvents[eventName])
        options.handleEvents[eventName] = () => options.enableEvents || true
    })
    // Make sure we get a service path from either the service or the options
    let { servicePath } = options
    if (!servicePath) {
      servicePath = getServicePath(service, Model)
    }
    options.servicePath = servicePath
    service.FeathersVuexModel = Model
    return (store) => {
      // (1^) Create and register the Vuex module
      options.namespace = makeNamespace(namespace, servicePath, nameStyle)
      const module = makeServiceModule(service, options, store)
      // Don't preserve state if reinitialized (prevents state pollution in SSR)
      store.registerModule(options.namespace, module, { preserveState: false })
      // (2a^) Monkey patch the BaseModel in globalModels
      const BaseModel = _get(globalModels, [options.serverAlias, 'BaseModel'])
      if (BaseModel && !BaseModel.store) {
        Object.assign(BaseModel, {
          store
        })
      }
      // (2b^) Monkey patch the Model(s) and add to globalModels
      assignIfNotPresent(Model, {
        namespace: options.namespace,
        servicePath,
        instanceDefaults,
        setupInstance,
        preferUpdate
      })
      // As per 1^, don't preserve state on the model either (prevents state pollution in SSR)
      Object.assign(Model, {
        store
      })
      if (!Model.modelName || Model.modelName === 'BaseModel') {
        throw new Error(
          'The modelName property is required for Feathers-Vuex Models'
        )
      }
      addModel(Model)
      // (3^) Setup real-time events
      if (options.enableEvents) {
        enableServiceEvents({ service, Model, store, options })
      }
    }
  }
}
