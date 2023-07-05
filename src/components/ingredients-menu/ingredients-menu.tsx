import React, { useState, memo, useEffect, useRef, FC } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { TTitlesOfIngredientCategories, TIngredientTitles } from '../../types/titles-of-ingredient-categories';
import { titlesOfIngredientCategories } from '../../utils/titlesOfIngredientCategories';
import styles from './ingredients-menu.module.css';

type TIngredientsMenuProps = {
  titles: TTitlesOfIngredientCategories;
};

const IngredientsMenu: FC<TIngredientsMenuProps> = memo(({ titles }) => {
  const bun = useRef<Element | null>(null);
  const sauce = useRef<Element | null>(null);
  const main = useRef<Element | null>(null);

  const [current, setCurrent] = useState<TIngredientTitles>("bun");

  const addTabObserver = (entries: IntersectionObserverEntry[], observer: IntersectionObserver): void => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting) {
        setCurrent(entry.target.classList[1] as TIngredientTitles);
      }
    })
  }

  const tabClickHandler = (title: string) => {
    if (title === "bun") {
      bun.current?.scrollIntoView({ behavior: "smooth" });
    }
    if (title === "main") {
      sauce.current?.scrollIntoView({ behavior: "smooth" });
    }
    if (title === "sauce") {
      main.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const ingredientCategories = Object.keys(titlesOfIngredientCategories).map((category: string) => {
      if (document.querySelector(`.${category}`)) {

        if (category === "bun") {
          bun.current = document.querySelector(`.${category}`);
        }
        if (category === "main") {
          sauce.current = document.querySelector(`.${category}`);
        }
        if (category === "sauce") {
          main.current = document.querySelector(`.${category}`);
        }

        return document.querySelector(`.${category}`);
      }
      return undefined;
    }).filter(Boolean);

    const options = {
      root: document.querySelector(".custom-scroll"),
      threshold: 0.5
    }
    const observer = new IntersectionObserver(addTabObserver, options);
    if (ingredientCategories.length) {

      ingredientCategories.forEach((elem: Element | null | undefined): void =>
        elem ? observer.observe(elem) : undefined);
    }

    return () => {
      if (ingredientCategories.length) {

        ingredientCategories.forEach((elem: Element | null | undefined) =>
          elem ? observer.unobserve(elem) : undefined);
      }
    }
  }, []);

  return (
    <div className={styles.menu}>
      {
        Object.keys(titles).map((item: string) =>
          (<Tab
            key={item}
            value={item}
            active={current === item}
            onClick={(title: string) => tabClickHandler(title)}
          >
            {titles[item as keyof typeof titles]}
          </Tab>)
        )
      }
    </div>
  )
});

export default IngredientsMenu;
