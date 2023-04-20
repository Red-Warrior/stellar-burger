import React, { memo } from 'react';
import PropTypes from 'prop-types';
import ingredientsPropTypes from "../../utils/ingredientsPropTypes";
import IngredientsMenu from "../ingredients-menu/ingredients-menu";
import Category from "../category/category";
import styles from './burger-ingredients.module.css';

const titles = {
  bun: 'Булки',
  sauce: 'Соусы',
  main: 'Начинки',
};

const BurgerIngredients = memo(({ingredients, handleOpenModal}) => {
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
          ["bun", "sauce", "main"].map((type) => (
              <Category
                key={type}
                title={titles[type]}
                ingredients={ingredientsSets[type]}
                handleOpenModal={handleOpenModal}
              />
            )
          )
        }
      </div>
    </div>
  );
});

export default BurgerIngredients;

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientsPropTypes.isRequired).isRequired,
  handleOpenModal: PropTypes.func.isRequired
};
