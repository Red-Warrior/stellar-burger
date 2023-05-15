import { getUser, signUp, signIn } from "../../utils/auth"

export const SET_USER_REQUEST = "SET_USER_REQUEST";
export const SET_USER_SUCCESS = "SET_USER_SUCCESS";
export const SET_USER_FAILED = "SET_USER_FAILED";

export const UPDATE_USER = "UPDATE_USER";
export const RESET_USER = "RESET_USER";

export const getUserRequest = () => (dispatch) => {
  dispatch({
    type: SET_USER_REQUEST,
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
      console.log(e);
    })
}

export const registerUserRequest = (payload) => (dispatch) => {
  dispatch({
    type: SET_USER_REQUEST,
  });

  signUp(payload)
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
      console.log(e);
    })
};

export const loginUserRequest = (payload) => (dispatch) => {
  dispatch({
    type: SET_USER_REQUEST,
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
      console.log(e);
    })
};
