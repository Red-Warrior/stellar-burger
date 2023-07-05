export type TRestorePasswordPayload = {
  email: string;
};

export type TResetPasswordPayload = {
  password: string;
  token: string;
};

export type TPostOrderPayload = {
  ingredients: string[]
};

export type TRegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export type TLoginPayload = {
  email: string;
  password: string;
};

export type TLogoutPayload = {
  token: string;
};

export type TUpdateTokenPayload = TLogoutPayload;

export type TEditUserPayload = TRegisterPayload;
