import React, { useState } from 'react';
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserData } from "../../services/user/selectors";
import { resetPasswordRequest } from "../../utils/auth";

const ForgotPasswordPage = () => {
  const {userName} = useSelector(getUserData);

  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const [passwordVisibility, setPasswordVisibility] = useState("password");

  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    const target = e.target;

    if (target.name === "password") {
      setPassword(target.value);
    } else {
      setToken(target.value);
    }
  };

  const makePasswordResetRequest = async (e) => {
    e.preventDefault();

    if (password && token) {
      const res = await resetPasswordRequest({password, token});

      if (res.success) {
        alert("Пароль успешно изменён");
        navigate("/");
      }
    } else {
      alert("Проверьте, что поле с новым паролем и кодом из письма заполнены");
    }
  }

  const descriptionTextStyle = "text text_type_main-default text_color_inactive";
  const linkTextStyle = "text text_type_main-default ml-2";

  if (!location?.state?.from) {
    alert("Маршрут недоступен.\nСначала запросите восстановление пароля.");
    return <Navigate to="/" replace />
  }

  if (userName) {
    return <Navigate to="/" replace />
  }

  return (
    <main className="stellarContainer">
      <h2 className="text text_type_main-medium mb-6">Восстановление пароля</h2>
      <Input
        extraClass="stellarInput"
        type={passwordVisibility}
        name="password"
        value={password}
        placeholder="Введите новый пароль"
        icon={passwordVisibility === "password" ? "ShowIcon" : "HideIcon"}
        onChange={(e) => handleChange(e)}
        onIconClick={() => setPasswordVisibility((prevState) => {
          return prevState === "password" ? "text" : "password";
        })}
      />
      <Input
        extraClass="stellarInput"
        type="text"
        name="token"
        value={token}
        placeholder="Введите код из письма"
        onChange={(e) => handleChange(e)}
      />
      <Button
        extraClass="mb-20"
        type="primary"
        size="medium"
        htmlType="submit"
        onClick={(e) => makePasswordResetRequest(e)}
      >
        Сохранить
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

export default ForgotPasswordPage;
