import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { getUserData } from "../services/user/selectors";
import { getUserRequest } from "../services/user/actions";

const ProtectedRouteElement = ({element}) => {
  const {userName, userRequest} = useSelector(getUserData);

  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userName) {
      dispatch(getUserRequest());
    }
  }, [dispatch, userName]);

  if (userRequest) {
    return null;
  }

  if (userName) {
    return element;
  }

  if (!userName && !userRequest) {
    alert(`Для доступа к ${location.pathname} необходимо авторизоваться!`);
    return <Navigate to="/login" replace state={{from: location}} />;
  }
};

export default ProtectedRouteElement;
