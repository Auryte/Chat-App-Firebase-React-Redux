import {
  USER_REGISTER_SUCCCESS,
  USER_REGISTER_FAILURE,
  USER_LOGIN,
  USER_LOGIN_SUCCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAILURE,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILURE,
  AUTH_DELETE_ERR,
  USER_DATA_NOT_FOUND
} from './actionTypes';

const initialState = {
  // user: {
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   password: "",
  // },
  user: undefined,
  authenticating: false,
  authenticated: false,
  error: null
};

const authReducer = (state = initialState, action) => {
  // const state = { ...state };
 
  console.log("action", action)
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        authenticating: true,
      };
    case USER_REGISTER_SUCCCESS:
      return {
        ...state,
        user: action.payload.user,
        authenticating: false,
        authenticated: true
      }
    case USER_REGISTER_FAILURE:
      return {
        ...state,
        authenticating: false,
        authenticated: false,
        error: action.payload.error
      }
    case USER_LOGIN_SUCCCESS:
      return {
        ...state,
        user: action.payload.user,
        authenticating: false,
        authenticated: true
      };
    case USER_LOGIN_FAILURE:
      return {
        ...state,
        authenticating: false,
        authenticated: false,
        error: action.payload.error,
        user: null
      };
    case USER_LOGOUT_SUCCESS:
      return {
        ...state,
        authenticating: false,
        authenticated: false
      }
    case USER_LOGOUT_FAILURE:
      return {
        ...state,
        ...action.payload.error
      }
    case AUTH_DELETE_ERR:
      return {
        ...state,
        error: null
      }
    case USER_UPDATE_SUCCESS:
      return {
        ...state,
        ...action.payload.user
      }
    case USER_UPDATE_FAILURE:
      return {
        ...state,
        error: action.payload.error
      }
      case USER_DATA_NOT_FOUND:
        return {
          ...state,
          user: null
        }
    default:
      return state;
  }
}

export default authReducer;