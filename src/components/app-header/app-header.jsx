import React, { useState } from 'react';
import styles from './app-header.module.css'
import buttonStyles from '../button-header/button-header.module.css'

import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ButtonHeader from "../button-header/button-header";

const AppHeader = () => {
  const [state, setState] = useState({
    constructor: 'primary',
    List: 'secondary',
    Icon: 'secondary'
  });

  const setActiveIcon = (e) => {

    const selectedName = e.currentTarget.name;
    setState((prevState) => {
      prevState = {...prevState};
      Object.keys(prevState)
        .forEach(name => prevState[name] = name === selectedName ? 'primary' : "secondary")
      return prevState;
    });
  }

  const activeStyle = `ml-2 text text_type_main-default ${buttonStyles.active}`;
  const defaultStyle = `ml-2 text text_type_main-default ${buttonStyles.default}`;

  return (
    <nav className={styles.appHeader}>
      <div className={styles.container}>
        <div className={styles.buttonContainer}>
          <ButtonHeader name="constructor" extraClass="mr-2" setActiveIcon={setActiveIcon} type="secondary">
            <BurgerIcon type={state.constructor} />
            <span className={state.constructor === 'primary' ? activeStyle : defaultStyle}>Конструктор</span>
          </ButtonHeader>

          <ButtonHeader name="List" setActiveIcon={setActiveIcon} type="secondary">
            <ListIcon type={state.List} />
            <span className={state.List === 'primary' ? activeStyle : defaultStyle}>Лента заказов</span>
          </ButtonHeader>
        </div>

        <Logo />

        <ButtonHeader extraClass={styles.iconButton} name="Icon" setActiveIcon={setActiveIcon} type="secondary">
          <ProfileIcon type={state.Icon} />
          <span className={state.Icon === 'primary' ? activeStyle : defaultStyle}>Личный кабинет</span>
        </ButtonHeader>
      </div>
    </nav>
  );
};

export default AppHeader;
