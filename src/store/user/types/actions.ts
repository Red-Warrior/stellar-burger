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
  SET_USER_REQUEST_STATUS
} from "../actions";
import { TGetUpdateUserData } from '../../../types/user';

export type TSetUserRequest = {
  readonly type: typeof SET_USER_REQUEST;
};

export type TSetUserSuccess = {
  readonly type: typeof SET_USER_SUCCESS;
  readonly payload: TGetUpdateUserData;
};

export type TSetUserFailed = {
  readonly type: typeof SET_USER_FAILED;
};

export type TUpdateUserRequest = {
  readonly type: typeof UPDATE_USER_REQUEST;
};

export type TUpdateUserSuccess = {
  readonly type: typeof UPDATE_USER_SUCCESS;
  readonly payload: TGetUpdateUserData;
};

export type TUpdateUserFailed = {
  readonly type: typeof UPDATE_USER_FAILED;
};

export type TResetUserRequest = {
  readonly type: typeof RESET_USER_REQUEST;
};

export type TResetUserSuccess = {
  readonly type: typeof RESET_USER_SUCCESS;
};

export type TResetUserFailed = {
  readonly type: typeof RESET_USER_FAILED;
};

export type TForgotPasswordRequest = {
  readonly type: typeof FORGOT_PASSWORD_REQUEST;
};

export type TForgotPasswordRequest_success = {
  readonly type: typeof FORGOT_PASSWORD_REQUEST_SUCCESS;
  readonly payload: string | null;
};

export type TForgotPasswordRequest_failed = {
  readonly type: typeof FORGOT_PASSWORD_REQUEST_FAILED;
};

export type TResetPasswordRequest = {
  readonly type: typeof RESET_PASSWORD_REQUEST;
};

export type TResetPasswordSuccess = {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
  readonly payload: string | null;
};

export type TResetPasswordFailed = {
  readonly type: typeof RESET_PASSWORD_FAILED;
};

export type TSetUserRequestStatus = {
  readonly type: typeof SET_USER_REQUEST_STATUS;
  readonly payload: string;
};

export type TUserActions =
  TSetUserRequest
  | TSetUserSuccess
  | TSetUserFailed
  | TUpdateUserRequest
  | TUpdateUserSuccess
  | TUpdateUserFailed
  | TResetUserRequest
  | TResetUserSuccess
  | TResetUserFailed
  | TForgotPasswordRequest
  | TForgotPasswordRequest_success
  | TForgotPasswordRequest_failed
  | TResetPasswordRequest
  | TResetPasswordSuccess
  | TResetPasswordFailed
  | TSetUserRequestStatus;
