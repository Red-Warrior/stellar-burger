import checkResponse from "./checkResponse";
import { getCookie } from "./cookie";

export const getIngredientsRequest = (url) => {
  return fetch(url).then((res) => checkResponse(res));
};

export const postOrder = (url, payload) => {
  return fetch(url, payload).then((res) => checkResponse(res));
};

export const restorePassword = (payload) => {
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

export const resetPassword = (payload) => {
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

export const register = (payload) => {
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

export const login = (payload) => {
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

export const logout = async (payload) => {
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

export const updateToken = async (payload) => {
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

export const editUser = async (payload) =>
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
