import React, { useEffect, useState, FC } from 'react';
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../services/user/selectors";
import {
  RESET_PASSWORD_SUCCESS,
  resetPasswordRequest
} from "../../services/user/actions";
import { CHANGED } from "../../services/user/constants";
import { TPasswordFieldsTypes } from '../../types/password-visible.js';

const ForgotPasswordPage: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const {
    userName,
    userResetPasswordRequest,
    userResetPasswordStatus
  } = useSelector(getUserData);

  const [password, setPassword] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [passwordVisibility, setPasswordVisibility] = useState<TPasswordFieldsTypes>("password");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const target = e.target;
    if (target.name === "password") {
      setPassword(target.value);
    } else {
      setToken(target.value);
    }
  };

  const makePasswordResetRequest = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (password && token) {
      // @ts-ignore
      dispatch(resetPasswordRequest({ password, token }));
    } else {
      alert("Проверьте, что поле с новым паролем и кодом из письма заполнены");
    }
  }

  // @ts-ignore
  useEffect(() => {
    return () => dispatch({ type: RESET_PASSWORD_SUCCESS, payload: null });
  }, [dispatch]);

  const descriptionTextStyle = "text text_type_main-default text_color_inactive";
  const linkTextStyle = "text text_type_main-default ml-2";

  if (!location?.state?.from) {
    alert("Маршрут недоступен.\nСначала запросите восстановление пароля.");
    return <Navigate to="/" replace />
  }

  if (userName) {
    return <Navigate to="/" replace />
  }
  if (!userResetPasswordRequest && userResetPasswordStatus === CHANGED) {
    return <Navigate to="/" />
  }

  return (
    <main className="stellarContainer">
      <h2 className="text text_type_main-medium mb-6">Восстановление пароля</h2>
      <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => makePasswordResetRequest(e)}>
        <Input
          extraClass="stellarInput"
          type={passwordVisibility}
          name="password"
          value={password}
          placeholder="Введите новый пароль"
          icon={passwordVisibility === "password" ? "ShowIcon" : "HideIcon"}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
          onIconClick={() => setPasswordVisibility((prevState) =>
            prevState === "password" ? "text" : "password"
          )}
        />
        <Input
          extraClass="stellarInput"
          type="text"
          name="token"
          value={token}
          placeholder="Введите код из письма"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
        />
        <Button
          extraClass="mb-20"
          type="primary"
          size="medium"
          htmlType="submit"
        >
          Сохранить
        </Button>
      </form>
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
