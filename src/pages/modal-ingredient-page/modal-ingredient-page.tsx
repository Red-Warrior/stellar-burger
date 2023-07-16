import React, { FC } from 'react';
import ModalIngredient from '../../components/modal/modal-ingredient/modal-ingredient';
import IngredientDetails from "../../components/modal/components/ingredient-details/ingredient-details";

const ModalIngredientPage: FC = () => {
  return (
    <ModalIngredient>
      <IngredientDetails />
    </ModalIngredient>)
};

export default ModalIngredientPage;
