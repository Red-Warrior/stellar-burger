import React, { useState, useEffect, useRef, FC } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../services/user/selectors";
import { logoutUserRequest, updateUserRequest } from "../../services/user/actions";
import { NavLink } from "react-router-dom";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile.module.css"
import linkStyles from "../../components/app-header/components/router-link/router-link.module.css"
import { TUserData } from '../../types/user.js';

const fieldsChecklist = {
  name: "isNameEditable",
  email: "isLoginEditable",
  password: "isPasswordEditable"
};

type TFieldsEditable = {
  isNameEditable: boolean;
  isLoginEditable: boolean;
  isPasswordEditable: boolean;
};

type TNavLinkProps = {
  isActive: boolean;
}

const ProfilePage: FC = () => {
  const dispatch = useDispatch();

  const { userName, userEmail } = useSelector(getUserData);

  const [userData, setUserData] = useState<TUserData>({
    name: userName,
    email: userEmail,
    password: "*****"
  });

  const [isFieldsEditable, setFieldsEditable] = useState<TFieldsEditable>({
    isNameEditable: false,
    isLoginEditable: false,
    isPasswordEditable: false
  });

  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const target = e.target;

    setUserData((prevState: TUserData) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const setEditableField = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    e.preventDefault();
    const target = e.currentTarget.parentNode?.childNodes[1] as HTMLInputElement;

    setFieldsEditable((prevState: TFieldsEditable) => ({
      ...prevState,
      [fieldsChecklist[target.name as keyof typeof fieldsChecklist]]:
        !prevState[fieldsChecklist[target.name as keyof typeof fieldsChecklist] as keyof typeof isFieldsEditable],
    }));
    setTimeout(() => target.focus());
  }

  const canselEdit = (): void => {
    setFieldsEditable({
      isNameEditable: false,
      isLoginEditable: false,
      isPasswordEditable: false
    })
  }

  const resetFields = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>): void => {
    e.preventDefault();
    setUserData({
      name: userName,
      email: userEmail,
      password: "*****"
    });
    canselEdit();
  };

  const editUserRequest = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (userData.password === "*****") {
      return alert("Введите ваш старый или новый пароль");
    }
    // @ts-ignore
    dispatch(updateUserRequest(userData));
  };

  const logout = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>): Promise<void> => {
    e.preventDefault();
    // @ts-ignore
    dispatch(logoutUserRequest());
  };

  useEffect(() => {
    if (isFieldsEditable.isNameEditable) nameRef.current?.focus();
    if (isFieldsEditable.isLoginEditable) emailRef.current?.focus();
    if (isFieldsEditable.isPasswordEditable) passwordRef.current?.focus();
  }, [isFieldsEditable]);

  const previousNameOfUser = useRef<string>(userName);
  useEffect(() => {
    if (userName && userName !== previousNameOfUser.current) {
      canselEdit();
    }
  }, [userName]);

  const linkTextStyle = "text text_type_main-medium text_color_inactive"
  const { isNameEditable, isLoginEditable, isPasswordEditable } = isFieldsEditable;

  return (
    <main className={`${styles.profile} mt-30`}>
      <nav className={styles.navBar}>
        <NavLink to="/profile" className={({ isActive }: TNavLinkProps) =>
          `${styles.navItem} ${linkTextStyle} ${linkStyles.active}`}
        >
          Профиль
        </NavLink>
        <NavLink to="orders" className={({ isActive }: TNavLinkProps) =>
          `${styles.navItem} ${linkTextStyle}`}
        >
          История заказов
        </NavLink>
        <NavLink
          to="/"
          className={({ isActive }: TNavLinkProps) => `${styles.navItem} ${linkTextStyle}`}
          onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => logout(e)}
        >
          Выход
        </NavLink>
        <p className={`${styles.annotation} text text_type_main-default text_color_inactive mt-20`}>
          В этом разделе вы можете<br />изменить свои персональные данные
        </p>
      </nav>
      <form
        className={styles.fieldsContainer}
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => editUserRequest(e)}
      >
        <Input
          ref={nameRef}
          extraClass="stellarInput"
          type="text"
          name="name"
          value={userData.name}
          placeholder="Имя"
          disabled={!isNameEditable}
          icon={isNameEditable ? "CloseIcon" : "EditIcon"}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
          onIconClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => setEditableField(e)}
        />
        <Input
          ref={emailRef}
          extraClass="stellarInput"
          type="email"
          name="email"
          value={userData.email}
          placeholder="Логин"
          disabled={!isLoginEditable}
          icon={isLoginEditable ? "CloseIcon" : "EditIcon"}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
          onIconClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => setEditableField(e)}
        />
        <Input
          ref={passwordRef}
          extraClass="stellarInput"
          type="password"
          name="password"
          value={userData.password}
          placeholder="Пароль"
          disabled={!isPasswordEditable}
          icon={isPasswordEditable ? "CloseIcon" : "EditIcon"}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
          onIconClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => setEditableField(e)}
        />
        {
          (isNameEditable || isLoginEditable || isPasswordEditable) && (
            <div className={styles.dashboard}>
              <span
                className={`${styles.cancel} mr-6`}
                onClick={(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => resetFields(e)}
              >
                Отмена
              </span>
              <Button
                type="primary"
                size="medium"
                htmlType="submit"
              >
                Сохранить
              </Button>
            </div>)
        }
      </form>
    </main>
  );
};

export default ProfilePage;
