import React from 'react';
import IngredientsMenu from "../ingredients-menu/ingredients-menu";
import Category from "../category/category";
import styles from './burger-ingredients.module.css';

const BurgerIngredients = ({ingredients}) => {
  const titles = {
    bun: 'Булки',
    sauce: 'Соусы',
    main: 'Начинки',
  };

  const ingredientsSets = ingredients.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {});

  const sets = Object.keys(ingredientsSets);

  return (
    <div className={`${styles.Ingredients} pt-10`}>
      <h1 className="text text_type_main-large pb-5">Соберите бургер</h1>
      <IngredientsMenu extraClass="pb-10" titles={titles} />
      <div className={`${styles.container} custom-scroll`}>
        {
          sets.map((type) => (
            <Category key={type} title={titles[type]} ingredients={ingredientsSets[type]} />)
          )
        }
      </div>
    </div>
  );
};

export default BurgerIngredients;
