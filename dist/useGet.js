/*
eslint
@typescript-eslint/no-explicit-any: 0
*/
import { reactive, computed, toRefs, isRef, watch } from '@vue/composition-api'
export default function get(options) {
  const defaults = {
    model: null,
    id: null,
    params: null,
    queryWhen: computed(() => true),
    local: false,
    immediate: true
  }
  const { model, id, params, queryWhen, local, immediate } = Object.assign(
    {},
    defaults,
    options
  )
  if (!model) {
    throw new Error(
      `No model provided for useGet(). Did you define and register it with FeathersVuex?`
    )
  }
  function getId() {
    return isRef(id) ? id.value : id || null
  }
  function getParams() {
    return isRef(params) ? params.value : params
  }
  const state = reactive({
    isPending: false,
    hasBeenRequested: false,
    hasLoaded: false,
    error: null,
    isLocal: local
  })
  const computes = {
    item: computed(() => {
      const getterId = isRef(id) ? id.value : id
      const getterParams = isRef(params)
        ? Object.assign({}, params.value)
        : params == null
        ? params
        : Object.assign({}, params)
      if (getterParams != null) {
        return model.getFromStore(getterId, getterParams) || null
      } else {
        return model.getFromStore(getterId) || null
      }
    }),
    servicePath: computed(() => model.servicePath)
  }
  function get(id, params) {
    const idToUse = isRef(id) ? id.value : id
    const paramsToUse = isRef(params) ? params.value : params
    if (idToUse != null && queryWhen.value && !state.isLocal) {
      state.isPending = true
      state.hasBeenRequested = true
      const promise =
        paramsToUse != null
          ? model.get(idToUse, paramsToUse)
          : model.get(idToUse)
      return promise
        .then((response) => {
          state.isPending = false
          state.hasLoaded = true
          return response
        })
        .catch((error) => {
          state.isPending = false
          state.error = error
          return error
        })
    } else {
      return Promise.resolve(undefined)
    }
  }
  watch(
    [() => getId(), () => getParams()],
    ([id, params]) => {
      get(id, params)
    },
    { immediate }
  )
  return Object.assign(
    Object.assign(Object.assign({}, toRefs(state)), computes),
    { get }
  )
}
