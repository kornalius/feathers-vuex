/*
eslint
@typescript-eslint/explicit-function-return-type: 0,
@typescript-eslint/no-explicit-any: 0
*/
import _omit from 'lodash/omit'
export default function makeDefaultState(options) {
  const nonStateProps = [
    'Model',
    'service',
    'instanceDefaults',
    'setupInstance',
    'handleEvents',
    'extend',
    'state',
    'getters',
    'mutations',
    'actions'
  ]
  const state = {
    ids: [],
    keyedById: {},
    copiesById: {},
    tempsById: {},
    pagination: {
      defaultLimit: null,
      defaultSkip: null
    },
    paramsForServer: ['$populateParams'],
    debounceEventsTime: null,
    isFindPending: false,
    isGetPending: false,
    isCreatePending: false,
    isUpdatePending: false,
    isPatchPending: false,
    isRemovePending: false,
    errorOnFind: null,
    errorOnGet: null,
    errorOnCreate: null,
    errorOnUpdate: null,
    errorOnPatch: null,
    errorOnRemove: null,
    isIdCreatePending: [],
    isIdUpdatePending: [],
    isIdPatchPending: [],
    isIdRemovePending: []
  }
  if (options.Model) {
    state.modelName = options.Model.modelName
  }
  const startingState = _omit(options, nonStateProps)
  return Object.assign({}, state, startingState)
}
