export const getUserLoggedIn = (state) => state.auth.authenticated;
export const getLoggedInUserData = (state) => state.auth.user

export const getAuthLoginErr = (state) => state.auth.error;
