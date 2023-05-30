import React, { useEffect, FC, ReactElement } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { getUserData } from "../services/user/selectors";
import { getUserRequest } from "../services/user/actions";
import { getCookie } from "../utils/cookie";

type TProtectedRouteElementProps = {
  element: ReactElement;
};

const ProtectedRouteElement: FC<TProtectedRouteElementProps> = ({ element }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const { userName, userRequest, userRequestStatus } = useSelector(getUserData);

  useEffect(() => {
    if (!getCookie('token')) return;

    if (!userName && !userRequest) {
      // @ts-ignore
      dispatch(getUserRequest());
    }
  }, [dispatch, userName, userRequest]);

  if (userName) {
    return element;
  }

  if (!userName && !userRequest && !userRequestStatus) {
    console.log(`Для доступа к ${location.pathname} необходимо авторизоваться!`);
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return null;
};

export default ProtectedRouteElement;
