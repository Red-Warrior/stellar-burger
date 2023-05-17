import {
  register,
  login,
  logout,
  updateToken,
  fetchUser,
  editUser,
  restorePassword,
  resetPassword,
} from "./api";
import { setCookie, deleteCookie, getCookie } from "./cookie";
import checkResponse from "./checkResponse";

export const renewToken = async (payload) => {
  return await updateToken(payload)
    .then(checkResponse)
    .then(data => {
      if (data.success) {
        const {accessToken, refreshToken} = data;
        const authToken = accessToken.split('Bearer ')[1];

        setCookie('token', authToken);
        setCookie('refreshToken', refreshToken);
      }
    })
    .catch((e) => {
      return Promise.reject(e);
    });
};

export const checkAuthFetch = async (request, payload, refreshTokenRequest) => {
  return await request(payload)
    .then(checkResponse)
    .catch(async (e) => {
      if (e.message === "jwt expired") {
        await refreshTokenRequest({token: getCookie('refreshToken')});
        return await request(payload).then(checkResponse);
      }
      return Promise.reject(e);
    })
};

export const getUser = async () => {
  return await checkAuthFetch(fetchUser, undefined, renewToken);
};

export const forgotPasswordRequest = async (payload) => {
  return await checkAuthFetch(restorePassword, payload, renewToken);
};

export const dropPasswordRequest = async (payload) => {
  return await checkAuthFetch(resetPassword, payload, renewToken);
};

export const editUserData = async (payload) => {
  return await checkAuthFetch(editUser, payload, renewToken);
};

export const signUp = async (payload) => {
  return await register(payload)
    .then(checkResponse)
    .then(res => {
      if (res.success) {
        const {user, accessToken, refreshToken} = res;
        const authToken = accessToken.split('Bearer ')[1];
        setCookie('token', authToken);
        setCookie('refreshToken', refreshToken);

        return user;
      }
    })
    .catch(e => Promise.reject(e));
}

export const signIn = async (payload) => {
  return await login(payload)
    .then(checkResponse)
    .then(res => {
      if (res.success) {
        const {user, accessToken, refreshToken} = res;
        const authToken = accessToken.split('Bearer ')[1];

        setCookie('token', authToken);
        setCookie('refreshToken', refreshToken);

        console.log("Авторизация прошла успешно!");
        return user;
      }
    })
    .catch((e) => {
      console.error(e);
    })
};

export const signOut = async () => {
  return await logout({token: getCookie('refreshToken')})
    .then(checkResponse)
    .then(res => {
      if (res.success) {
        deleteCookie('token');
        deleteCookie('refreshToken');
        return res;
      }
    })
    .catch(e => {
      console.error(e);
    });
};
