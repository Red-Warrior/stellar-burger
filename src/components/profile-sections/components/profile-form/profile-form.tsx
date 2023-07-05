import React, { useEffect, useRef, useState, FC } from 'react';
import { useSelector } from 'react-redux';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { updateUserRequest } from '../../../../store/user/actions';
import { getUserData } from '../../../../store/user/selectors';
import { useAppDispatch } from '../../../../store/hooks';
import { TUserData } from '../../../../types/user';
import styles from '../../../../pages/profile-page/profile-page.module.css';

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

const ProfileForm: FC = () => {
  const dispatch = useAppDispatch();

  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

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

    dispatch(updateUserRequest(userData));
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

  const { isNameEditable, isLoginEditable, isPasswordEditable } = isFieldsEditable;

  return (
    <form className="mt-30" onSubmit={(e: React.FormEvent<HTMLFormElement>) => editUserRequest(e)}>
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
        (isNameEditable || isLoginEditable || isPasswordEditable) ? (
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
          </div>) : null
      }
    </form>
  );
};

export default ProfileForm;
