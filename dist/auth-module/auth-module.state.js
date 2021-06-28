export default function setupAuthState({
  userService,
  serverAlias,
  responseEntityField = 'user',
  entityIdField = 'userId'
}) {
  const state = {
    accessToken: null,
    payload: null,
    entityIdField,
    responseEntityField,
    isAuthenticatePending: false,
    isLogoutPending: false,
    errorOnAuthenticate: null,
    errorOnLogout: null,
    user: null,
    userService: null,
    serverAlias
  }
  // If a userService string was passed, add a user attribute
  if (userService) {
    Object.assign(state, { userService })
  }
  return state
}
