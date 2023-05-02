import React, { useState, memo, useEffect } from "react";
import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './ingredients-menu.module.css';

const IngredientsMenu = memo(({titles}) => {
  const [current, setCurrent] = useState('bun');

  const addTabObserver = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setCurrent(entry.target.classList[1]);
      }
    })
  }

  useEffect(() => {
    const bun = document.querySelector(".bun");
    const sauce = document.querySelector(".sauce");
    const main = document.querySelector(".main");

    const options = {
      root: document.querySelector(".custom-scroll"),
      threshold: 0.5
    }
    const observer = new IntersectionObserver(addTabObserver, options);

    [bun, sauce, main].forEach(elem => observer.observe(elem));

    return () => {
      [bun, sauce, main].forEach(elem => observer.unobserve(elem));
    }
  }, []);

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
