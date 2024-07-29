import { user, initialState } from "./reducer";
import * as types from './actions';
import { INITIAL, FINISHED, REQUESTED, CHANGED } from "./constants";

describe('burger constructor reducer', () => {
  const defaultUser = {name: "user", email: "user@email.com"};
  const updatedUser = {name: "updatedUser", email: "updatedUser@email.com"};

  it('should return the initial state', () => {
    expect(user(undefined, {})).toEqual(initialState)
  })

  it('set user request', () => {
    expect(
      user(undefined, {
        type: types.SET_USER_REQUEST,
      })
    ).toEqual({
      userName: "",
      userEmail: "",
      userRequest: true,
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
    })
  })

  it('set user success', () => {
    expect(
      user(undefined, {
        type: types.SET_USER_SUCCESS,
        payload: defaultUser
      })
    ).toEqual({
      userName: defaultUser.name,
      userEmail: defaultUser.email,
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
    })
  })

  it('set user failed', () => {
    expect(
      user(undefined, {
        type: types.SET_USER_FAILED,
      })
    ).toEqual({
      userName: "",
      userEmail: "",
      userRequest: false,
      userRequestFailed: true,
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
    })
  })

  it('update user request', () => {
    expect(
      user(undefined, {
        type: types.UPDATE_USER_REQUEST,
      })
    ).toEqual({
      userName: "",
      userEmail: "",
      userRequest: false,
      userRequestFailed: false,
      userUpdateRequest: true,
      userUpdateFailed: false,
      userResetRequest: false,
      userResetFailed: false,
      userRequestStatus: null,
      userForgotPasswordRequest: false,
      userForgotPasswordFailed: false,
      userResetPasswordStatus: null,
      userResetPasswordRequest: false,
      userResetPasswordFailed: false
    })
  })

  it('update user success', () => {
    expect(
      user(undefined, {
        type: types.UPDATE_USER_SUCCESS,
        payload: updatedUser
      })
    ).toEqual({
      userName: updatedUser.name,
      userEmail: updatedUser.email,
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
    })
  })

  it('update user failed', () => {
    expect(
      user(undefined, {
        type: types.UPDATE_USER_FAILED,
      })
    ).toEqual({
      userName: "",
      userEmail: "",

      userRequest: false,
      userRequestFailed: false,

      userUpdateRequest: false,
      userUpdateFailed: true,

      userResetRequest: false,
      userResetFailed: false,

      userRequestStatus: null,

      userForgotPasswordRequest: false,
      userForgotPasswordFailed: false,

      userResetPasswordStatus: null,

      userResetPasswordRequest: false,
      userResetPasswordFailed: false
    })
  })

  it('reset user request', () => {
    expect(
      user(undefined, {
        type: types.RESET_USER_REQUEST,
      })
    ).toEqual({
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
      userResetPasswordRequest: true,
      userResetPasswordFailed: false
    })
  })

  it('reset user success', () => {
    expect(
      user(undefined, {
        type: types.RESET_USER_SUCCESS,
        payload: null
      })
    ).toEqual({
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
    })
  })

  it('reset user failed', () => {
    expect(
      user(undefined, {
        type: types.RESET_USER_FAILED,
      })
    ).toEqual({
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
      userResetPasswordFailed: true
    })
  })

  it('forgot password request', () => {
    expect(
      user(undefined, {
        type: types.FORGOT_PASSWORD_REQUEST,
      })
    ).toEqual({
      userName: "",
      userEmail: "",
      userRequest: false,
      userRequestFailed: false,
      userUpdateRequest: false,
      userUpdateFailed: false,
      userResetRequest: false,
      userResetFailed: false,
      userRequestStatus: null,
      userForgotPasswordRequest: true,
      userForgotPasswordFailed: false,
      userResetPasswordStatus: null,
      userResetPasswordRequest: false,
      userResetPasswordFailed: false
    })
  })

  it('forgot password request success', () => {
    expect(
      user(undefined, {
        type: types.FORGOT_PASSWORD_REQUEST_SUCCESS,
        payload: REQUESTED
      })
    ).toEqual({
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
      userResetPasswordStatus: REQUESTED,
      userResetPasswordRequest: false,
      userResetPasswordFailed: false
    })
  })

  it('forgot password request failed', () => {
    expect(
      user(undefined, {
        type: types.FORGOT_PASSWORD_REQUEST_FAILED,
      })
    ).toEqual({
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
      userForgotPasswordFailed: true,
      userResetPasswordStatus: null,
      userResetPasswordRequest: false,
      userResetPasswordFailed: false
    })
  })

  it('reset password request', () => {
    expect(
      user(undefined, {
        type: types.RESET_PASSWORD_REQUEST,
      })
    ).toEqual({
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
      userResetPasswordRequest: true,
      userResetPasswordFailed: false
    })
  })

  it('reset password success', () => {
    expect(
      user(undefined, {
        type: types.RESET_PASSWORD_SUCCESS,
        payload: CHANGED
      })
    ).toEqual({
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
      userResetPasswordStatus: CHANGED,
      userResetPasswordRequest: false,
      userResetPasswordFailed: false
    })
  })

  it('reset password failed', () => {
    expect(
      user(undefined, {
        type: types.RESET_PASSWORD_FAILED,
      })
    ).toEqual({
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
      userResetPasswordFailed: true
    })
  })

  it('set user request status', () => {
    expect(
      user(undefined, {
        type: types.SET_USER_REQUEST_STATUS,
        payload: INITIAL || FINISHED || REQUESTED || CHANGED
      })
    ).toEqual({
      userName: "",
      userEmail: "",
      userRequest: false,
      userRequestFailed: false,
      userUpdateRequest: false,
      userUpdateFailed: false,
      userResetRequest: false,
      userResetFailed: false,
      userRequestStatus: INITIAL || FINISHED || REQUESTED || CHANGED,
      userForgotPasswordRequest: false,
      userForgotPasswordFailed: false,
      userResetPasswordStatus: null,
      userResetPasswordRequest: false,
      userResetPasswordFailed: false
    })
  })
})
