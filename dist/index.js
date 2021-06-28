/*
eslint
@typescript-eslint/explicit-function-return-type: 0,
@typescript-eslint/no-explicit-any: 0
*/
import FeathersVuexFind from './FeathersVuexFind'
import FeathersVuexGet from './FeathersVuexGet'
import FeathersVuexFormWrapper from './FeathersVuexFormWrapper'
import FeathersVuexInputWrapper from './FeathersVuexInputWrapper'
import FeathersVuexPagination from './FeathersVuexPagination'
import makeFindMixin from './make-find-mixin'
import makeGetMixin from './make-get-mixin'
import { globalModels as models } from './service-module/global-models'
import { clients, addClient } from './service-module/global-clients'
import makeBaseModel from './service-module/make-base-model'
import prepareMakeServicePlugin from './service-module/make-service-plugin'
import prepareMakeAuthPlugin from './auth-module/make-auth-plugin'
import useFind from './useFind'
import useGet from './useGet'
import { initAuth, hydrateApi } from './utils'
import { FeathersVuex } from './vue-plugin/vue-plugin'
const events = ['created', 'patched', 'updated', 'removed']
const defaults = {
  autoRemove: false,
  addOnUpsert: false,
  enableEvents: true,
  idField: 'id',
  tempIdField: '__id',
  debug: false,
  keepCopiesInStore: false,
  nameStyle: 'short',
  paramsForServer: ['$populateParams'],
  preferUpdate: false,
  replaceItems: false,
  serverAlias: 'api',
  handleEvents: {},
  skipRequestIfExists: false,
  whitelist: [] // Custom query operators that will be allowed in the find getter.
}
export default function feathersVuex(feathers, options) {
  if (!feathers || !feathers.service) {
    throw new Error(
      'The first argument to feathersVuex must be a feathers client.'
    )
  }
  // Setup the event handlers. By default they just return the value of `options.enableEvents`
  defaults.handleEvents = events.reduce((obj, eventName) => {
    obj[eventName] = () => options.enableEvents || true
    return obj
  }, {})
  options = Object.assign({}, defaults, options)
  if (!options.serverAlias) {
    throw new Error(
      `You must provide a 'serverAlias' in the options to feathersVuex`
    )
  }
  addClient({ client: feathers, serverAlias: options.serverAlias })
  const BaseModel = makeBaseModel(options)
  const makeServicePlugin = prepareMakeServicePlugin(options)
  const makeAuthPlugin = prepareMakeAuthPlugin(feathers, options)
  return {
    makeServicePlugin,
    BaseModel,
    makeAuthPlugin,
    FeathersVuex,
    models: models,
    clients
  }
}
export {
  initAuth,
  hydrateApi,
  FeathersVuexFind,
  FeathersVuexGet,
  FeathersVuexFormWrapper,
  FeathersVuexInputWrapper,
  FeathersVuexPagination,
  FeathersVuex,
  makeFindMixin,
  makeGetMixin,
  models,
  clients,
  useFind,
  useGet
}
