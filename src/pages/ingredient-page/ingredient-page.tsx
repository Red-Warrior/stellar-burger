import React, { FC } from 'react';
import IngredientDetails from "../../components/modal/components/ingredient-details/ingredient-details";
import withModal from '../../components/hocs/with-modal';

const WithModalIngredient = withModal(IngredientDetails);

const IngredientPage: FC = () => {
  return (
    <div className="mt-10">
      <WithModalIngredient />
    </div>
  );
};

export default IngredientPage;
