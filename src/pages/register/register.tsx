import React, { useState, FC } from 'react';
import { Link, Navigate } from "react-router-dom";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../services/user/selectors";
import { registerUserRequest } from "../../services/user/actions";
import { TPasswordFieldsTypes } from '../../types/password-visible.js';
import { TUserData } from '../../types/user.js';

const RegisterPage: FC = () => {
  const dispatch = useDispatch();
  const { userName } = useSelector(getUserData);

  const [passwordVisibility, setPasswordVisibility] = useState<TPasswordFieldsTypes>("password");
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
      // @ts-ignore
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
        <Input
          extraClass="stellarInput"
          name="email"
          type="email"
          value={email}
          placeholder="E-mail"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)} />
        <Input
          extraClass="stellarInput"
          name="password"
          type={passwordVisibility}
          value={password}
          placeholder="Пароль"
          icon={passwordVisibility === "password" ? "ShowIcon" : "HideIcon"}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
          onIconClick={() => setPasswordVisibility((prevState: TPasswordFieldsTypes) =>
            prevState === "password" ? "text" : "password"
          )}
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
