import React, { FC } from 'react';
import IngredientDetails from "../../components/modal/components/ingredient-details/ingredient-details";
import styles from "./ingredient-page.module.css"

const IngredientPage: FC = () => {
  return (
    <div className="mt-10">
      <h2 className={styles.title}>Детали ингредиента</h2>
      <IngredientDetails />
    </div>
  );
};

export default IngredientPage;
