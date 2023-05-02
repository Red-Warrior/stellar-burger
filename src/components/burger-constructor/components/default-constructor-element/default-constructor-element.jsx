import React from 'react';
import styles from "./default-constructor-element.module.css";

const DefaultConstructorElement = ({type, text, extraClass = "", isHover}) => {
  const className = `${styles.constructorElement} ${styles[type]} ${extraClass}`;

  return (
    <div className={`${className} ${isHover ? styles.hover : ""}`}>
      <span>{text}</span>
    </div>
  );
};

export default DefaultConstructorElement;
