import React from 'react';
import styles from './spinner.module.css'
import logo from '../images/logo.svg';

const Spinner = () => {
  return (
    <div>
      <img src={logo} className={styles.logo} alt="logo" />
    </div>
  );
};

export default Spinner;
