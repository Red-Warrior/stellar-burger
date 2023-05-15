import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { signUp } from "../../utils/auth";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../services/user/selectors";
import { SET_USER_SUCCESS } from "../../services/user/actions";

const RegisterPage = () => {
  const {nameStore} = useSelector(getUserData);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const target = e.target;

    if (target.name === "name") {
      setName(target.value);
    } else if (target.name === "email") {
      setEmail(target.value);
    } else {
      setPassword(target.value);
    }
  };

  const registration = async (e) => {
    e.preventDefault();
    if (name && email && password) {

      const user = await signUp({name, email, password});

      console.log(user);

      if (user) {
        dispatch({type: SET_USER_SUCCESS, payload: user})
        alert(`Пользователь ${user.name} успешно зарегистрирован!`);
        navigate("/");
      }
    } else {
      alert("Проверьте, что поля: Имя, E-mail, Пароль заполнены");
    }
  }

  const descriptionTextStyle = "text text_type_main-default text_color_inactive";
  const linkTextStyle = "text text_type_main-default ml-2";

  if (nameStore) {
    return <Navigate to="/" replace />
  }

  return (
    <main className="stellarContainer">
      <h2 className="text text_type_main-medium mb-6">Регистрация</h2>
      <Input
        extraClass="stellarInput"
        name="name"
        type="text"
        value={name}
        placeholder="Имя"
        onChange={(e) => handleChange(e)} />
      <Input
        extraClass="stellarInput"
        name="email"
        type="email"
        value={email}
        placeholder="E-mail"
        onChange={(e) => handleChange(e)} />
      <Input
        extraClass="stellarInput"
        name="password"
        type="password"
        value={password}
        placeholder="Пароль"
        icon="ShowIcon"
        onChange={(e) => handleChange(e)} />
      <Button
        extraClass="mb-20"
        type="primary"
        size="medium"
        htmlType="submit"
        onClick={(e) => registration(e)}
      >
        Зарегистрироваться
      </Button>
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
