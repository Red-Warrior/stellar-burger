import React, { FC, useEffect } from "react";
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import Spinner from "../../components/spinner/spinner";
import { useAppSelector } from '../../store/hooks';
import { getStoreIngredients } from "../../store/ingredients/selectors";
import { getMakeOrderRequestStatus } from '../../store/order/selectors';
import styles from "./constructor-page.module.css"

const BurgerConstructorDashboard: FC = () => {

  const { ingredients, ingredientsRequest, ingredientsFailed } = useAppSelector(getStoreIngredients);
  const makeOrderRequestIsTrue = useAppSelector(getMakeOrderRequestStatus);

  const loading = "Загрузка...";
  const order = <p className={styles.info}><span>Ваш заказ обрабатывается</span><span>Подождите немного...</span></p>;

  useEffect(() => {
  }, []);

  return (
    <>
      {
        (ingredientsRequest || makeOrderRequestIsTrue) ? (
          <div className={styles.loading}>
            <Spinner />
            <div className="text text_type_main-large text_color_inactive pb-6">
              {ingredientsRequest ? loading : makeOrderRequestIsTrue ? order : ""}
            </div>
          </div>) : null
      }
      {ingredientsFailed && 'Произошла ошибка'}

      {
        (!ingredientsRequest &&
          !ingredientsFailed &&
          !makeOrderRequestIsTrue &&
          ingredients && ingredients.length) ? (
          <main className={styles.container}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
          </main>) : null
      }
    </>
  );
}

export default BurgerConstructorDashboard;
