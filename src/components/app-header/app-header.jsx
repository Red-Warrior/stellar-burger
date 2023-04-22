import React from 'react';
import linkStyles from './components/link-header/link-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import LinkHeader from "./components/link-header/link-header";
import styles from './app-header.module.css';

const AppHeader = () => {
  const activeStyle = `ml-2 text text_type_main-default ${linkStyles.active}`;
  const defaultStyle = `ml-2 text text_type_main-default ${linkStyles.default}`;

  return (
    <nav className={styles.appHeader}>
      <div className={styles.container}>
        <div className={styles.linkContainer}>
          <LinkHeader name="constructor" extraClass="mr-2" type="secondary">
            <BurgerIcon type="primary" />
            <span className={activeStyle}>Конструктор</span>
          </LinkHeader>

          <LinkHeader name="List" type="secondary">
            <ListIcon type="secondary" />
            <span className={defaultStyle}>Лента заказов</span>
          </LinkHeader>
        </div>

        <Logo />

        <LinkHeader extraClass={styles.icon} name="Icon" type="secondary">
          <ProfileIcon type="secondary" />
          <span className={defaultStyle}>Личный кабинет</span>
        </LinkHeader>
      </div>
    </nav>
  );
};

export default AppHeader;
