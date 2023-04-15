import React, { useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './ingredients-menu.module.css'

const IngredientsMenu = ({menuTitles, extraClass}) => {
  const [current, setCurrent] = useState('bun');

  return (
    <div className={`${styles.menu} ${extraClass}`}>
      {
        menuTitles.map(item =>
          <Tab key={item.value} value={item.value} active={current === item.value} onClick={setCurrent}>
            {item.content}
          </Tab>)
      }
    </div>
  )
}

export default IngredientsMenu;
