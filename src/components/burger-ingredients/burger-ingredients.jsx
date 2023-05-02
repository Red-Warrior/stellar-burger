import React, { memo } from "react";
import { useSelector } from 'react-redux';
import { getStoreIngredients } from "../../services/ingredients/selectors"

import IngredientsMenu from "../ingredients-menu/ingredients-menu";
import Category from "../category/category";
import styles from "./burger-ingredients.module.css";

const titles = {
  bun: 'Булки',
  sauce: 'Соусы',
  main: 'Начинки',
};

const BurgerIngredients = memo(() => {
  const {ingredients} = useSelector(getStoreIngredients);

  const ingredientsSets = ingredients.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {});

  return (
    <div className={`${styles.Ingredients} pt-10`}>
      <h1 className="text text_type_main-large pb-5">Соберите бургер</h1>
      <IngredientsMenu titles={titles} />
      <div className={`${styles.container} custom-scroll`}>
        {
          ["bun", "main", "sauce"].map((type) => (
              <Category
                extraClass={type}
                key={type}
                title={titles[type]}
                ingredients={ingredientsSets[type]}
              />
            )
          )
        }
      </div>
    </div>
  );
});

export default BurgerIngredients;
