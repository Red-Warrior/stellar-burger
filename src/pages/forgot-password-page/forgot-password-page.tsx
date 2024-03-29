import React, { useState, useEffect, FC } from 'react';
import { EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate, useLocation } from "react-router-dom";
import { getUserData } from "../../store/user/selectors";
import {
  FORGOT_PASSWORD_REQUEST_SUCCESS,
  restorePasswordRequest
} from "../../store/user/actions";
import { REQUESTED } from "../../store/user/constants";
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const ResetPasswordPage: FC = () => {
  const dispatch = useAppDispatch()
  const location = useLocation();

  const { userName, userForgotPasswordRequest, userResetPasswordStatus } = useAppSelector(getUserData);
  const [email, setEmail] = useState<string>("");

  const makePasswordForgetRequest = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (email) {
      dispatch(restorePasswordRequest({ email }));
    } else {
      alert("Заполните поле email");
    }
  }

  useEffect(() => {
    return () => {
      dispatch({ type: FORGOT_PASSWORD_REQUEST_SUCCESS, payload: null });
    }
  }, [dispatch]);

  const descriptionTextStyle = "text text_type_main-default text_color_inactive";
  const linkTextStyle = "text text_type_main-default ml-2";

  if (userName) {
    return <Navigate to="/" replace />
  }

  if (!userForgotPasswordRequest && userResetPasswordStatus === REQUESTED) {
    return <Navigate to="/reset-password" replace state={{ from: location }} />
  }

  return (
    <main className="stellarContainer">
      <h2 className="text text_type_main-medium mb-6">Восстановление пароля</h2>
      <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => makePasswordForgetRequest(e)}>
        <EmailInput
          extraClass="stellarInput"
          value={email}
          placeholder="Укажите e-mail"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        />
        <Button
          extraClass="mb-20"
          type="primary"
          size="medium"
          htmlType="submit"
        >
          Восстановить
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

export default ResetPasswordPage;
