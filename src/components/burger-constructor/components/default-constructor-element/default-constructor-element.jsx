import React from 'react';
import styles from "./default-constructor-element.module.css";
import PropTypes from "prop-types";

const DefaultConstructorElement = ({type, text, extraClass = "", isHover}) => {
  const className = `${styles.constructorElement} ${styles[type]} ${extraClass}`;

  return (
    <div className={`${className} ${isHover ? styles.hover : ""}`}>
      <span>{text}</span>
    </div>
  );
};

export default DefaultConstructorElement;

DefaultConstructorElement.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string.isRequired,
  extraClass: PropTypes.string,
  isHover: PropTypes.bool
};
