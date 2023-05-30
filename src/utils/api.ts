import checkResponse from "./checkResponse";
import { getCookie } from "./cookie";
import {
  TRestorePasswordPayload,
  TResetPasswordPayload,
  TPostOrderPayload,
  TRegisterPayload,
  TLoginPayload,
  TLogoutPayload,
  TUpdateTokenPayload,
  TEditUserPayload
} from '../types/api-payload-types.js';


export const getIngredientsRequest = () => {
  return fetch(`${process.env.REACT_APP_BURGER_API_URL}/ingredients`, {
    method: "GET",
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  }).then((res: Response) => checkResponse(res));
};

export const postOrder = (payload: TPostOrderPayload) => {
  return fetch(`${process.env.REACT_APP_BURGER_API_URL}/orders`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  }).then((res: Response) => checkResponse(res));
};

export const restorePassword = (payload: TRestorePasswordPayload) => {
  return fetch(`${process.env.REACT_APP_BURGER_API_URL}/password-reset`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token')
    },
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  })
};

export const resetPassword = (payload: TResetPasswordPayload) => {
  return fetch(`${process.env.REACT_APP_BURGER_API_URL}/password-reset/reset`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token')
    },
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  })
}

export const register = (payload: TRegisterPayload) => {
  return fetch(`${process.env.REACT_APP_BURGER_API_URL}/auth/register`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  })
};

export const login = (payload: TLoginPayload) => {
  return fetch(`${process.env.REACT_APP_BURGER_API_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  })
};

export const logout = async (payload: TLogoutPayload) => {
  return await fetch(`${process.env.REACT_APP_BURGER_API_URL}/auth/logout`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  })
};

export const updateToken = async (payload: TUpdateTokenPayload) => {
  return await fetch(`${process.env.REACT_APP_BURGER_API_URL}/auth/token`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  })
};

export const fetchUser = async () =>
  await fetch(`${process.env.REACT_APP_BURGER_API_URL}/auth/user`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token')
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  })

export const editUser = async (payload: TEditUserPayload) =>
  await fetch(`${process.env.REACT_APP_BURGER_API_URL}/auth/user`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token')
    },
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  })
