import React, { FC } from 'react';
import IngredientDetails from "../../components/modal/components/ingredient-details/ingredient-details";
import withModal from '../../components/hocs/with-modal';
import styles from '../../components/hocs/modal.module.css';

const style = `${styles.modal} ${styles.ingredient}`;
const WithModalIngredient = withModal(IngredientDetails);

const ModalIngredientPage: FC = () => {
  return (<WithModalIngredient style={style} />)
};

export default ModalIngredientPage;
