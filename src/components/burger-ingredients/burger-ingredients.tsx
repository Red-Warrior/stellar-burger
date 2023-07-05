import React, { FC } from "react";
import { getStoreIngredients } from "../../store/ingredients/selectors"
import IngredientsMenu from "../ingredients-menu/ingredients-menu";
import Category from "../category/category";
import { useAppSelector } from '../../store/hooks';
import { titlesOfIngredientCategories } from '../../utils/titlesOfIngredientCategories';
import { TIngredientTitles } from '../../types/titles-of-ingredient-categories';
import { TIngredient } from '../../types/ingredient';
import styles from "./burger-ingredients.module.css";

type TIngredientSets = {
  [key in TIngredientTitles]: TIngredient[];
};

const BurgerIngredients: FC = () => {
  const { ingredients } = useAppSelector(getStoreIngredients);

  const ingredientsSets = ingredients.reduce((acc: TIngredientSets, item: TIngredient) => {
    acc[item.type as keyof typeof titlesOfIngredientCategories].push(item);


    return acc;
  }, { bun: [], sauce: [], main: [] });

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
                ingredients={ingredientsSets[type as keyof typeof titlesOfIngredientCategories]}
              />
            )
          )
        }
      </div>
    </div>
  );
};

export default BurgerIngredients;
