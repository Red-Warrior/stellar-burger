import React, { useState, useMemo, useEffect, FC } from 'react';
import { Outlet, useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useAppDispatch } from '../../store/hooks';
import { logoutUserRequest } from '../../store/user/actions';
import styles from "./profile-page.module.css"

const ProfilePage: FC = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const [currentPath, setPath] = useState<string>("");

  const isActivePath = useMemo<boolean>(() => {
    return currentPath === "/profile";
  }, [currentPath]);

  useEffect(() => {
    setPath(pathname);
  }, [pathname]);

  const logout = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>): Promise<void> => {
    e.preventDefault();
    dispatch(logoutUserRequest());
  };

  const linkTextStyle = "text text_type_main-medium"

  return (
    <main className={styles.profile}>
      <nav className={`${styles.navBar} mt-30`}>
        <NavLink
          to="/profile"
          className={`${styles.navItem} ${linkTextStyle} ${isActivePath ? "activeTextColor" : "text_color_inactive"}`}
        >
          Профиль
        </NavLink>
        <NavLink
          to="/profile/orders"
          className={`${styles.navItem} ${linkTextStyle} ${!isActivePath ? "activeTextColor" : "text_color_inactive"}`}
        >
          История заказов
        </NavLink>
        <NavLink
          to="/"
          className={`${styles.navItem} ${linkTextStyle} text_color_inactive`}
          onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => logout(e)}
        >
          Выход
        </NavLink>
        {
          currentPath === "/profile" ?
            <p className={`${styles.annotation} text text_type_main-default text_color_inactive mt-20`}>
              В этом разделе вы можете<br />изменить свои персональные данные
            </p>
            :
            <p className={`${styles.annotation} text text_type_main-default text_color_inactive mt-20`}>
              В этом разделе вы можете<br />просмотреть свою историю заказов
            </p>
        }
      </nav>

      <section className={styles.fieldsContainer}>
        <Outlet />
      </section>
    </main>
  );
};

export default ProfilePage;
