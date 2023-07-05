export type TUserData = {
  name: string;
  email: string;
  password: string;
};

export type TGetUpdateUserData = Omit<TUserData, "password">;
