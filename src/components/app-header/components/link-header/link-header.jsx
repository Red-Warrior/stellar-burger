import React from 'react';
import PropTypes from "prop-types";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './link-header.module.css';

const LinkHeader = (
  {
    children,
    type = 'primary',
    size = 'medium',
    htmlType = 'button',
    extraClass = '',
    setActiveIcon = undefined,
    name = undefined,
  }) => {

  return (
    <Button
      extraClass={`${extraClass} ${styles.linkHeader} pl-5 pr-5`}
      type={type}
      size={size}
      htmlType={htmlType}
      name={name}
      onClick={setActiveIcon}
    >
      {children}
    </Button>
  );
};

export default LinkHeader;

LinkHeader.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
  type: PropTypes.string,
  size: PropTypes.string,
  htmlType: PropTypes.string,
  extraClass: PropTypes.string,
  setActiveIcon: PropTypes.func,
  name: PropTypes.string
};
