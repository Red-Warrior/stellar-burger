import React from 'react';
import IngredientsMenu from "../ingredients-menu/ingredients-menu";
import Collection from "../collection/collection";
import styles from './burger-ingredients.module.css';

const BurgerIngredients = ({ingredients}) => {
  const menuTitles = [{
    value: 'bun',
    content: 'Булки'
  }, {
    value: 'sauce',
    content: 'Соусы'
  }, {
    value: 'main',
    content: 'Начинки'
  }]

  const titles = menuTitles.reduce((acc, item) => {
    acc[item.value] = item.content;
    return acc;
  }, {})

  const ingredientsSets = ingredients.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {})

  return (
    <div className={`${styles.Ingredients} pt-10`}>
      <h1 className="text text_type_main-large pb-5">Соберите бургер</h1>
      <IngredientsMenu extraClass="pb-10" menuTitles={menuTitles} />
      <div className={`${styles.container} custom-scroll`}>
        {
          Object.keys(titles).map((section) => (
            <Collection key={section} title={titles[section]} ingredients={ingredientsSets[section]} />)
          )
        }
      </div>
    </div>
  );
};

export default BurgerIngredients;
