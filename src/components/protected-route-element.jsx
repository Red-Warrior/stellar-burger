import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { getUserData } from "../services/user/selectors";
import { getUserRequest } from "../services/user/actions";
import { FINISHED } from "../services/user/constants";
import PropTypes from "prop-types";

const ProtectedRouteElement = ({element}) => {
  const {userName, userEmail, userRequest, userRequestStatus} = useSelector(getUserData);

  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userName && !userRequest) {
      dispatch(getUserRequest());
    }
  }, [dispatch, userName, userRequest]);

  if (location?.state?.from?.pathname === "/profile" && !userName) {
    return <Navigate to="/login" replace />;
  }

  if (userRequestStatus !== FINISHED) {
    return null;
  }

  if (userName) {
    return element;
  }

  if (!userName && !userEmail && userRequestStatus === FINISHED) {
    console.warn(`Для доступа к ${location.pathname} необходимо авторизоваться!`);
    return <Navigate to="/login" replace state={{from: location}} />;
  }
};

export default ProtectedRouteElement;

ProtectedRouteElement.propTypes = {
  element: PropTypes.element.isRequired,
};
