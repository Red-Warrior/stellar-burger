import React, { useState } from 'react';
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserData } from "../../services/user/selectors";
import { restorePasswordRequest } from "../../utils/auth";

const ResetPasswordPage = () => {
  const {userName} = useSelector(getUserData);
  const [email, setEmail] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const makePasswordForgetRequest = async (e) => {
    e.preventDefault();

    if (email) {
      const res = await restorePasswordRequest({email})
      if (res.success) {
        navigate("/reset-password", {state: {from: location}});
      }
    } else {
      alert("Заполните поле email");
    }
  }

  const descriptionTextStyle = "text text_type_main-default text_color_inactive";
  const linkTextStyle = "text text_type_main-default ml-2";

  if (userName) {
    return <Navigate to="/" replace />
  }

  return (
    <main className="stellarContainer">
      <h2 className="text text_type_main-medium mb-6">Восстановление пароля</h2>
      <Input
        extraClass="stellarInput"
        type="email"
        value={email}
        placeholder="Укажите e-mail"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button
        extraClass="mb-20"
        type="primary"
        size="medium"
        htmlType="submit"
        onClick={(e) => makePasswordForgetRequest(e)}
      >
        Восстановить
      </Button>
      <p className="stellarTextContainer">
        <span className={descriptionTextStyle}
        >
          Вспомнили пароль?
        </span>
        <Link to="/login" className={`${linkTextStyle} stellarLink`}>
          Войти
        </Link>
      </p>
    </main>
  );
};

export default ResetPasswordPage;
