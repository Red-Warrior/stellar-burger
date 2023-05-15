import React from 'react';
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import styles from './router-link.module.css';

const RouterLink = (
  {
    children,
    iconPrimary: IconPrimary,
    iconSecondary: IconSecondary,
    to,
    extraClass = '',
  }) => {

  return (
    <NavLink
      to={to}
      className={({isActive}) =>
        `${extraClass} ${styles.linkHeader} ${isActive ? styles.active : ""} pl-5 pr-5`
      }
    >
      {({isActive}) => isActive ? [IconPrimary, children] : [IconSecondary, children]}
    </NavLink>
  );
};

export default RouterLink;

RouterLink.propTypes = {
  children: PropTypes.element,
  iconPrimary: PropTypes.element,
  iconSecondary: PropTypes.element,
  to: PropTypes.string,
  extraClass: PropTypes.string,
};
