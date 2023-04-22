import React, { useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './ingredients-menu.module.css'

const IngredientsMenu = ({titles, extraClass}) => {
  const [current, setCurrent] = useState('bun');

  return (
    <div className={`${styles.menu} ${extraClass}`}>
      {
        Object.keys(titles).map(item =>
          <Tab key={item} value={item} active={current === item} onClick={setCurrent}>
            {titles[item]}
          </Tab>)
      }
    </div>
  )
}

export default IngredientsMenu;
