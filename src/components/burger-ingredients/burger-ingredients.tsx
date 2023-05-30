import React, { FC } from "react";
import { useSelector } from 'react-redux';
import { getStoreIngredients } from "../../services/ingredients/selectors"
import IngredientsMenu from "../ingredients-menu/ingredients-menu";
import Category from "../category/category";
import styles from "./burger-ingredients.module.css";
import { TTitlesOfIngredientCategories, TIngredientTitles } from '../../types/titles-of-ingredient-categories.js';
import { TIngredient } from '../../types/ingredient.js';

type TIngredientSets = {
  [key in TIngredientTitles]: TIngredient[];
};

export const titlesOfIngredientCategories: TTitlesOfIngredientCategories = {
  bun: 'Булки',
  sauce: 'Соусы',
  main: 'Начинки',
};

const BurgerIngredients: FC = () => {
  const { ingredients } = useSelector(getStoreIngredients);

  const ingredientsSets = ingredients.reduce((acc: TIngredientSets, item: TIngredient) => {
    if (!acc[item.type as keyof typeof titlesOfIngredientCategories]) {
      acc[item.type as keyof typeof titlesOfIngredientCategories] = [];
    }
    acc[item.type as keyof typeof titlesOfIngredientCategories].push(item);
    return acc;
  }, {});

  return (
    <div className={`${styles.Ingredients} pt-10`}>
      <h1 className="text text_type_main-large pb-5">Соберите бургер</h1>
      <IngredientsMenu titles={titlesOfIngredientCategories} />
      <div className={`${styles.container} custom-scroll`}>
        {
          ["bun", "main", "sauce"].map((type) => (
              <Category
                extraClass={type}
                key={type}
                title={titlesOfIngredientCategories[type as keyof typeof titlesOfIngredientCategories]}
                ingredients={ingredientsSets[type]}
              />
            )
          )
        }
      </div>
    </div>
  );
};

export default BurgerIngredients;
