import React, { FC, useEffect } from 'react';
import { Outlet } from "react-router-dom";
import AppHeader from "../../components/app-header/app-header";
import { WS_CONNECTION_CLOSED } from '../../store/ws/actions';
import { useAppDispatch } from '../../store/hooks';
import styles from "./layout.module.css";

const LayoutPage: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  });

  return (
    <div className={styles.app}>
      <AppHeader />
      <Outlet />
    </div>
  );
};

export default LayoutPage;
