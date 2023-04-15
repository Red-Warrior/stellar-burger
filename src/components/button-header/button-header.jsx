import React from 'react';
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './button-header.module.css'

const ButtonHeader = (
  {
    children,
    type = 'primary',
    size = 'medium',
    htmlType = 'button',
    extraClass = '',
    setActiveIcon = null,
    name = undefined,
  }) => {

  return (
    <Button
      style={{border: "1px solid deeppink"}}
      extraClass={`${extraClass} ${styles.buttonHeader} pl-5 pr-5`}
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

export default ButtonHeader;
