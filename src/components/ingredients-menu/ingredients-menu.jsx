import React, { useState, memo } from "react";
import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './ingredients-menu.module.css';

const IngredientsMenu = memo(({titles}) => {
  const [current, setCurrent] = useState('bun');

  return (
    <div className={styles.menu}>
      {
        Object.keys(titles).map(item =>
          (<Tab key={item} value={item} active={current === item} onClick={setCurrent}>
            {titles[item]}
          </Tab>)
        )
      }
    </div>
  )
});

export default IngredientsMenu;

IngredientsMenu.propTypes = {
  titles: PropTypes.objectOf(PropTypes.string)
};
