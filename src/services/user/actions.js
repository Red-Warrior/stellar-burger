import { getUser, signUp, signIn, signOut, editUserData } from "../../utils/auth"
import { INITIAL, FINISHED } from "./constants";

export const SET_USER_REQUEST = "SET_USER_REQUEST";
export const SET_USER_REQUEST_STATUS = "SET_USER_REQUEST_STATUS";

export const SET_USER_SUCCESS = "SET_USER_SUCCESS";
export const SET_USER_FAILED = "SET_USER_FAILED";

export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const RESET_USER_SUCCESS = "RESET_USER_SUCCESS";

export const getUserRequest = () => (dispatch) => {
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

export const loginUserRequest = (payload) => (dispatch) => {
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

export const registerUserRequest = (payload) => (dispatch) => {
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

export const updateUserRequest = (payload) => (dispatch) => {
  dispatch({
    type: SET_USER_REQUEST,
  });

  editUserData(payload)
    .then(res => {
      console.log("Данные пользователя успешно изменены!")
      dispatch({type: UPDATE_USER_SUCCESS, payload: res.user});
    })
    .catch(e => {
      dispatch({
        type: SET_USER_FAILED
      })
      console.error(e);
    })
};

export const logoutUserRequest = () => (dispatch) => {
  dispatch({
    type: SET_USER_REQUEST,
  });

  signOut()
    .then(_ => {
      console.log("Успешно выполнен выход из системы!");
      dispatch({type: RESET_USER_SUCCESS});
    })
    .catch(e => {
      dispatch({
        type: SET_USER_FAILED
      })
      console.error(e);
    })
};
