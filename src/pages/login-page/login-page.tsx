import React, { useState, FC } from 'react';
import { Link, useLocation, Navigate } from "react-router-dom";
import { EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { loginUserRequest } from "../../store/user/actions";
import { getUserData } from "../../store/user/selectors";
import { useAppDispatch, useAppSelector } from '../../store/hooks';

type TUserData = {
  email: string;
  password: string;
};

const LoginPage: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const { userName } = useAppSelector(getUserData);
  const [userData, setUserData] = useState<TUserData>({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const target = e.target;
    setUserData((prevState: TUserData) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const login = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (userData.email && userData.password) {
      dispatch(loginUserRequest(userData));
    } else {
      console.warn("Проверьте, что поля: E-mail и Пароль заполнены");
    }
  }

  const descriptionTextStyle = "text text_type_main-default text_color_inactive";
  const linkTextStyle = "text text_type_main-default ml-2";

  if (userName) {
    if (location.state?.from) {
      return <Navigate to={location.state.from.pathname} replace />
    }
    return <Navigate to="/" replace />
  }

  return (
    <main className="stellarContainer">
      <h2 className="text text_type_main-medium mb-6">Вход</h2>
      <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => login(e)}>
        <EmailInput
          extraClass="stellarInput"
          name="email"
          value={userData.email}
          placeholder="E-mail"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
        />
        <PasswordInput
          extraClass="stellarInput"
          name="password"
          value={userData.password}
          placeholder="Пароль"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
        />
        <Button
          extraClass="mb-20"
          type="primary"
          size="medium"
          htmlType="submit"
        >
          Войти
        </Button>
      </form>
      <p className="stellarTextContainer mb-4">
        <span className={descriptionTextStyle}>
          Вы — новый пользователь?
        </span>
        <Link to="/register" className={`${linkTextStyle} stellarLink`}>
          Зарегистрироваться
        </Link>
      </p>
      <p className="stellarTextContainer">
        <span className={descriptionTextStyle}>
          Забыли пароль?
        </span>
        <Link to="/forgot-password" className={`${linkTextStyle} stellarLink`}>
          Восстановить пароль
        </Link>
      </p>
    </main>
  );
};

export default LoginPage;
