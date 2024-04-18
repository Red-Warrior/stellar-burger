import React, { useEffect, FC, ReactElement } from 'react';
import { Navigate, useLocation } from "react-router-dom";
import { getUserData } from "../store/user/selectors";
import { getUserRequest } from "../store/user/actions";
import { getCookie } from "../utils/cookie";
import { useAppDispatch, useAppSelector } from '../store/hooks';

type TProtectedRouteElementProps = {
  element: ReactElement;
};

const ProtectedRouteElement: FC<TProtectedRouteElementProps> = ({ element }) => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const { userName, userRequest } = useAppSelector(getUserData);

  useEffect(() => {
    if (!getCookie('token')) return;

    if (!userName && !userRequest) {
      dispatch(getUserRequest());
    }
  }, [dispatch, userName, userRequest]);

  if (userName) {
    return element;
  }

  if (!userName && !userRequest) {
    console.log(`Для доступа к ${location.pathname} необходимо авторизоваться!`);
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return null;
};

export default ProtectedRouteElement;
