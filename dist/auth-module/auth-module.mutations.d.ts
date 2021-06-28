export default function makeAuthMutations(): {
    setAccessToken(state: any, payload: any): void;
    setPayload(state: any, payload: any): void;
    setUser(state: any, payload: any): void;
    setAuthenticatePending(state: any): void;
    unsetAuthenticatePending(state: any): void;
    setLogoutPending(state: any): void;
    unsetLogoutPending(state: any): void;
    setAuthenticateError(state: any, error: any): void;
    clearAuthenticateError(state: any): void;
    setLogoutError(state: any, error: any): void;
    clearLogoutError(state: any): void;
    logout(state: any): void;
};
