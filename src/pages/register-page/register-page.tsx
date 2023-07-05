import React, { useState, FC } from 'react';
import { Link, Navigate } from "react-router-dom";
import { Input, Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { getUserData } from "../../store/user/selectors";
import { registerUserRequest } from "../../store/user/actions";
import { TUserData } from '../../types/user';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const RegisterPage: FC = () => {
  const dispatch = useAppDispatch();
  const { userName } = useAppSelector(getUserData);

  const [userData, setUserData] = useState<TUserData>({ name: "", email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const target = e.target;
    setUserData((prevState: TUserData) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const registration = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (userData.name && userData.email && userData.password) {
      dispatch(registerUserRequest(userData));
    } else {
      alert("Проверьте, что поля: Имя, E-mail, Пароль заполнены");
    }
  }

  const descriptionTextStyle = "text text_type_main-default text_color_inactive";
  const linkTextStyle = "text text_type_main-default ml-2";

  if (userName) {
    return <Navigate to="/" replace />
  }

  const { name, email, password } = userData;
  return (
    <main className="stellarContainer">
      <h2 className="text text_type_main-medium mb-6">Регистрация</h2>
      <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => registration(e)}>
        <Input
          extraClass="stellarInput"
          name="name"
          type="text"
          value={name}
          placeholder="Имя"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)} />
        <EmailInput
          extraClass="stellarInput"
          name="email"
          placeholder="E-mail"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
        />
        <PasswordInput
          extraClass="stellarInput"
          name="password"
          value={password}
          placeholder="Пароль"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
        />
        <Button
          extraClass="mb-20"
          type="primary"
          size="medium"
          htmlType="submit"
        >
          Зарегистрироваться
        </Button>
      </form>
      <p className="stellarTextContainer">
        <span className={descriptionTextStyle}>
          Уже зарегистрированы?
        </span>
        <Link to="/login" className={`${linkTextStyle} stellarLink`}>
          Войти
        </Link>
      </p>
    </main>
  );
};

export default RegisterPage;
