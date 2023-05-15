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

export const renewToken = async (payload) => {
  return await updateToken(payload)
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        const {accessToken, refreshToken} = data;
        const authToken = accessToken.split('Bearer ')[1];

        setCookie('token', authToken);
        setCookie('refreshToken', refreshToken);
      }
    })
    .catch((e) => {
      console.err(e)
    });
};

export const checkAuthFetch = async (request, payload, refreshTokenRequest) => {
  const res = await request(payload)
    .then(res => res.json())
    .catch((e) => {
      console.log(e)
    });

  console.log(res);

  if (res.success) {
    return res;
  }

  if (!res.success && res.message === "jwt expired") {
    await refreshTokenRequest({token: getCookie('refreshToken')});
    const res = await request(payload)
      .then(res => res.json())
      .catch((e) => {
        console.log(e)
      });

    if (res.success) {
      return res;
    }
  }
};

export const getUser = async () => {
  return await checkAuthFetch(fetchUser, undefined, renewToken);
};

export const restorePasswordRequest = async (payload) => {
  return await checkAuthFetch(restorePassword, payload, renewToken);
};

export const resetPasswordRequest = async (payload) => {
  return await checkAuthFetch(resetPassword, payload, renewToken);
};

export const editUserData = async (payload) => {
  return await checkAuthFetch(editUser, payload, renewToken);
};

export const signUp = async (payload) => {
  const res = await register(payload)
    .then(res => res.json())
    .catch(e => {
      console.log(e);
    });

  if (res.success) {
    const {user, accessToken, refreshToken} = res;
    const authToken = accessToken.split('Bearer ')[1];

    setCookie('token', authToken);
    setCookie('refreshToken', refreshToken);

    return user;
  }
}

export const signIn = async (payload) => {
  return await login(payload)
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        const {user, accessToken, refreshToken} = data;
        const authToken = accessToken.split('Bearer ')[1];

        setCookie('token', authToken);
        setCookie('refreshToken', refreshToken);

        alert("Авторизация прошла успешно!");
        return user;
      }
    })
    .catch((e) => {
      console.log(e);
    })
};

export const signOut = async () => {
  const res = await logout({token: getCookie('refreshToken')})
    .then(res => res.json())
    .catch(e => {
      console.log(e);
    });

  if (res.success) {
    deleteCookie('token');
    deleteCookie('refreshToken');
    return res;
  }
};
