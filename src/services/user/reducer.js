import {
  SET_USER_REQUEST,
  SET_USER_SUCCESS,
  SET_USER_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  RESET_USER_REQUEST,
  RESET_USER_SUCCESS,
  RESET_USER_FAILED,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_REQUEST_SUCCESS,
  FORGOT_PASSWORD_REQUEST_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  SET_USER_REQUEST_STATUS,
} from './actions';

const initialState = {
  userName: "",
  userEmail: "",

  userRequest: false,
  userRequestFailed: false,

  userUpdateRequest: false,
  userUpdateFailed: false,

  userResetRequest: false,
  userResetFailed: false,

  userRequestStatus: null,

  userForgotPasswordRequest: false,
  userForgotPasswordFailed: false,

  userResetPasswordStatus: null,

  userResetPasswordRequest: false,
  userResetPasswordFailed: false
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_REQUEST:
      return {
        ...state,
        userRequest: true,
      };

    case SET_USER_SUCCESS:
      const user = action.payload;
      return {
        userName: user.name,
        userEmail: user.email,
        userRequest: false,
        userRequestFailed: false,
      };

    case SET_USER_FAILED:
      return {
        userName: "",
        userEmail: "",
        userRequest: false,
        userRequestFailed: true,
      };

    case UPDATE_USER_REQUEST:
      return {
        ...state,
        userUpdateRequest: true,
        userUpdateFailed: false,
      };

    case UPDATE_USER_SUCCESS:
      const updatedUser = action.payload;
      return {
        ...state,
        userName: updatedUser.user,
        userEmail: updatedUser.email,
        userRequest: false,
        userRequestFailed: false,
      };

    case UPDATE_USER_FAILED:
      return {
        ...state,
        userUpdateRequest: false,
        userUpdateFailed: true,
      };

    case RESET_USER_REQUEST:
      return {
        ...state,
        userResetPasswordRequest: true,
        userResetPasswordFailed: false
      };

    case RESET_USER_SUCCESS:
      return {
        userName: "",
        userEmail: "",
        userRequest: false,
        userRequestFailed: false,
      };

    case RESET_USER_FAILED:
      return {
        ...state,
        userResetPasswordRequest: false,
        userResetPasswordFailed: true
      };

    case FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        userForgotPasswordRequest: true,
        userForgotPasswordFailed: false
      };
    case FORGOT_PASSWORD_REQUEST_SUCCESS:
      return {
        ...state,
        userForgotPasswordRequest: false,
        userForgotPasswordFailed: false,
        userResetPasswordStatus: action.payload
      };
    case FORGOT_PASSWORD_REQUEST_FAILED:
      return {
        ...state,
        userResetPasswordStatus: null,
        userForgotPasswordRequest: false,
        userForgotPasswordFailed: true
      };
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        userResetPasswordRequest: true,
        userResetPasswordFailed: false

      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        userResetPasswordRequest: false,
        userResetPasswordFailed: false,
        userResetPasswordStatus: action.payload

      };
    case RESET_PASSWORD_FAILED:
      return {
        ...state,
        userResetPasswordStatus: null,
        userResetPasswordRequest: false,
        userResetPasswordFailed: true
      };

    case SET_USER_REQUEST_STATUS:
      return {
        ...state,
        userRequestStatus: action.payload,
      };

    default:
      return state;
  }
};
