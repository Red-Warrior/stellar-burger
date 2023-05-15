import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_USER, RESET_USER } from "../../services/user/actions";
import { editUserData } from "../../utils/auth";
import { signOut } from "../../utils/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { getUserData } from "../../services/user/selectors";
import styles from "./profile.module.css"
import linkStyles from "../../components/app-header/components/router-link/router-link.module.css"

const ProfilePage = () => {
  const {userName, userEmail} = useSelector(getUserData);

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [name, setName] = useState(userName);
  const [email, setEmail] = useState(userEmail);
  const [password, setPassword] = useState("*****");

  const [isNameEditable, setIsEditable] = useState(false);
  const [isLoginEditable, setIsLoginEditable] = useState(false);
  const [isPasswordEditable, setIsPasswordEditable] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const setEditableField = (e) => {
    e.preventDefault();

    const target = e.currentTarget.parentNode.childNodes[1].name;

    if (target === "name") {
      setIsEditable((prevState) => !prevState);
      if (!isNameEditable) {
        setName(userName);
      }
      setTimeout(() => nameRef.current.focus());
    }
    if (target === "email") {
      setIsLoginEditable((prevState) => !prevState);
      if (!isLoginEditable) {
        setEmail(userEmail);
      }
      setTimeout(() => emailRef.current.focus());
    }
    if (target === "password") {
      setIsPasswordEditable((prevState) => !prevState);
      if (!isPasswordEditable) {
        setPassword("*****");
      }
      setTimeout(() => passwordRef.current.focus());

    }
  }

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

  const canselEdit = () => {
    setIsEditable(false);
    setIsLoginEditable(false);
    setIsPasswordEditable(false);
  }

  const resetFields = (e) => {
    e.preventDefault();
    setName(userName);
    setEmail(userEmail);
    setPassword("*****");

    canselEdit();
  };

  const editUserRequest = async (e) => {
    e.preventDefault();

    if (password === "*****") {
      return alert("Введите ваш старый или новый пароль");
    }

    const res = await editUserData({name, email, password});
    if (res.success) {
      dispatch({type: UPDATE_USER, payload: res.user});
    }

    canselEdit();
    alert("Данные пользователя успешно изменены!")
  };

  const logout = async (e) => {
    e.preventDefault();

    const res = await signOut();

    if (res.success) {
      dispatch({type: RESET_USER});
      alert("Успешно выполнен выход из системы!")
      navigate("/");
    }
  };

  const linkTextStyle = "text text_type_main-medium text_color_inactive"

  return (
    <main className={`${styles.profile} mt-30`}>
      <nav className={styles.navBar}>
        <NavLink to="/profile" className={({isActive}) =>
          `${styles.navItem} ${linkTextStyle} ${linkStyles.active}`}
        >
          Профиль
        </NavLink>
        <NavLink to="orders" className={({isActive}) =>
          `${styles.navItem} ${linkTextStyle}`}
        >
          История заказов
        </NavLink>
        <NavLink
          to="/"
          className={({isActive}) => `${styles.navItem} ${linkTextStyle}`}
          onClick={e => logout(e)}
        >
          Выход
        </NavLink>
        <p className={`${styles.annotation} text text_type_main-default text_color_inactive mt-20`}>
          В этом разделе вы можете<br />изменить свои персональные данные
        </p>
      </nav>

      <section className={styles.fieldsContainer}>
        <Input
          ref={nameRef}
          extraClass="stellarInput"
          type="text"
          name="name"
          value={name}
          placeholder="Имя"
          disabled={!isNameEditable}
          icon={isNameEditable ? "CloseIcon" : "EditIcon"}
          onChange={(e) => handleChange(e)}
          onIconClick={(e) => setEditableField(e)}
        />
        <Input
          ref={emailRef}
          extraClass="stellarInput"
          type="email"
          name="email"
          value={email}
          placeholder="Логин"
          disabled={!isLoginEditable}
          icon={isLoginEditable ? "CloseIcon" : "EditIcon"}
          onChange={(e) => handleChange(e)}
          onIconClick={(e) => setEditableField(e)}
        />
        <Input
          ref={passwordRef}
          extraClass="stellarInput"
          type="password"
          name="password"
          value={password}
          placeholder="Пароль"
          disabled={!isPasswordEditable}
          icon={isPasswordEditable ? "CloseIcon" : "EditIcon"}
          onChange={(e) => handleChange(e)}
          onIconClick={(e) => setEditableField(e)}
        />

        {
          (isNameEditable || isLoginEditable || isPasswordEditable) && (
            <div className={styles.dashboard}>
              <span
                className={`${styles.cancel} mr-6`}
                onClick={(e) => resetFields(e)}>Отмена</span>
              <Button
                type="primary"
                size="medium"
                htmlType="submit"
                onClick={(e) => editUserRequest(e)}>
                Сохранить
              </Button>
            </div>)
        }
      </section>
    </main>
  );
};

export default ProfilePage;
