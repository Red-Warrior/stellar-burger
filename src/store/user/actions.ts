import {
  getUser,
  signUp,
  signIn,
  signOut,
  editUserData,
  forgotPasswordRequest,
  dropPasswordRequest
} from "../../services/auth";
import { INITIAL, FINISHED, REQUESTED, CHANGED } from "./constants";
import {
  TEditUserPayload,
  TLoginPayload,
  TRegisterPayload,
  TResetPasswordPayload,
  TRestorePasswordPayload
} from '../../types/api-payload';
import { AppDispatch, AppThunkAction } from '../types';

export const SET_USER_REQUEST: "SET_USER_REQUEST" = "SET_USER_REQUEST";
export const SET_USER_SUCCESS: "SET_USER_SUCCESS" = "SET_USER_SUCCESS";
export const SET_USER_FAILED: "SET_USER_FAILED" = "SET_USER_FAILED";

export const UPDATE_USER_REQUEST: "UPDATE_USER_REQUEST" = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS: "UPDATE_USER_SUCCESS" = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILED: "UPDATE_USER_FAILED" = "UPDATE_USER_FAILED";

export const RESET_USER_REQUEST: "RESET_USER_REQUEST" = "RESET_USER_REQUEST";
export const RESET_USER_SUCCESS: "RESET_USER_SUCCESS" = "RESET_USER_SUCCESS";
export const RESET_USER_FAILED: "RESET_USER_FAILED" = "RESET_USER_FAILED";

export const FORGOT_PASSWORD_REQUEST: "FORGOT_PASSWORD_REQUEST" = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_REQUEST_SUCCESS: "FORGOT_PASSWORD_REQUEST_SUCCESS" = "FORGOT_PASSWORD_REQUEST_SUCCESS";
export const FORGOT_PASSWORD_REQUEST_FAILED: "FORGOT_PASSWORD_REQUEST_FAILED" = "FORGOT_PASSWORD_REQUEST_FAILED";
export const RESET_PASSWORD_REQUEST: "RESET_PASSWORD_REQUEST" = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS: "RESET_PASSWORD_SUCCESS" = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED: "RESET_PASSWORD_FAILED" = "RESET_PASSWORD_FAILED";
export const SET_USER_REQUEST_STATUS: "SET_USER_REQUEST_STATUS" = "SET_USER_REQUEST_STATUS";

export const getUserRequest = (): AppThunkAction => (dispatch: AppDispatch) => {
  dispatch({
    type: SET_USER_REQUEST,
  });
  dispatch({
    type: SET_USER_REQUEST_STATUS,
    payload: INITIAL
  });

  getUser()
    .then(res => {
      dispatch({
        type: SET_USER_SUCCESS,
        payload: res.user
      })
    })
    .catch(e => {
      dispatch({
        type: SET_USER_FAILED
      })
      console.error(e);
    })
    .finally(() => {
      dispatch({
        type: SET_USER_REQUEST_STATUS,
        payload: FINISHED
      })
    })
}

export const loginUserRequest = (payload: TLoginPayload): AppThunkAction => (dispatch: AppDispatch) => {
  dispatch({
    type: SET_USER_REQUEST,
  });
  dispatch({
    type: SET_USER_REQUEST_STATUS,
    payload: INITIAL
  });

  signIn(payload)
    .then(user => {
      dispatch({
        type: SET_USER_SUCCESS,
        payload: user
      })
    })
    .catch(e => {
      dispatch({
        type: SET_USER_FAILED
      })
      console.error(e);
    })
    .finally(() => {
      dispatch({
        type: SET_USER_REQUEST_STATUS,
        payload: FINISHED
      })
    })
};

export const registerUserRequest = (payload: TRegisterPayload): AppThunkAction => (dispatch: AppDispatch) => {
  dispatch({
    type: SET_USER_REQUEST,
  });

  signUp(payload)
    .then(user => {
      console.log(`Пользователь ${user.name} успешно зарегистрирован!`);
      dispatch({
        type: SET_USER_SUCCESS,
        payload: user
      })
    })
    .catch(e => {
      dispatch({
        type: SET_USER_FAILED
      })
      console.error(e);
    })
};

export const updateUserRequest = (payload: TEditUserPayload): AppThunkAction => (dispatch: AppDispatch) => {
  dispatch({
    type: SET_USER_REQUEST,
  });

  editUserData(payload)
    .then(res => {
      console.log("Данные пользователя успешно изменены!")
      dispatch({ type: UPDATE_USER_SUCCESS, payload: res.user });
    })
    .catch(e => {
      dispatch({
        type: SET_USER_FAILED
      })
      console.error(e);
    })
};

export const logoutUserRequest = (): AppThunkAction => (dispatch: AppDispatch) => {
  dispatch({
    type: SET_USER_REQUEST,
  });

  signOut()
    .then(_ => {
      console.log("Успешно выполнен выход из системы!");
      dispatch({ type: RESET_USER_SUCCESS });
    })
    .catch(e => {
      dispatch({
        type: SET_USER_FAILED
      })
      console.error(e);
    })
};

export const restorePasswordRequest = (payload: TRestorePasswordPayload): AppThunkAction => (dispatch: AppDispatch) => {
  dispatch({
    type: FORGOT_PASSWORD_REQUEST,
  });

  forgotPasswordRequest(payload)
    .then(_ => {
      dispatch({ type: FORGOT_PASSWORD_REQUEST_SUCCESS, payload: REQUESTED });
    })
    .catch(e => {
      dispatch({
        type: FORGOT_PASSWORD_REQUEST_FAILED
      })
      console.error(e);
    })
};

export const resetPasswordRequest = (payload: TResetPasswordPayload): AppThunkAction => (dispatch: AppDispatch) => {
  dispatch({
    type: RESET_PASSWORD_REQUEST,
  });

  dropPasswordRequest(payload)
    .then(_ => {
      console.log("Пароль успешно изменён");
      dispatch({ type: RESET_PASSWORD_SUCCESS, payload: CHANGED });
    })
    .catch(e => {
      dispatch({
        type: RESET_PASSWORD_FAILED
      })
      console.error(e);
    })
};
