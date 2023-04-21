import React, { useState, useEffect, useCallback } from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import IngredientDetails from "../modal/components/ingredient-details/ingredient-details";
import OrderDetails from "../modal/components/order-details/order-details";
import { getIngredients } from "../../utils/api";
import styles from "./app.module.css";
import modalStyles from "../modal/modal.module.css";

const App = () => {
  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    data: []
  });

  const [modalIngredient, setModalIngredient] = useState(null);

  const [modalOrder, setModalOrder] = useState(null);

  const handleOpenModal = useCallback((payload) => {
    if (typeof payload === 'object') {
      setModalIngredient(payload);
    } else {
      setModalOrder(payload);
    }
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalIngredient(null);
    setModalOrder(null);
  }, []);

  useEffect(() => {
    setState({...state, hasError: false, isLoading: true});

    getIngredients(`${process.env.REACT_APP_BURGER_API_URL}/ingredients`)
      .then(payload => setState({...state, data: payload.data, isLoading: false}))
      .catch(e => {
        setState({...state, hasError: true, isLoading: false});
        console.log(e);
      });

    // eslint-disable-next-line
  }, []);

  const {data, isLoading, hasError} = state;

  return (
    <div className={styles.app}>
      <AppHeader />
      {isLoading && 'Загрузка...'}
      {hasError && 'Произошла ошибка'}
      {
        !isLoading &&
        !hasError &&
        data.length && (
          <main className={styles.container}>
            <BurgerIngredients ingredients={data} handleOpenModal={handleOpenModal} />
            <BurgerConstructor ingredients={data} handleOpenModal={handleOpenModal} />
          </main>
        )
      }
      {
        (modalIngredient || modalOrder) &&
        <Modal
          extraClass={modalIngredient ? modalStyles.ingredient : modalStyles.order}
          title={modalIngredient ? "Детали ингредиента" : ""}
          handleCloseModal={handleCloseModal}
        >
          {
            modalIngredient ?
              <IngredientDetails payload={modalIngredient}></IngredientDetails>
              :
              <OrderDetails payload={modalOrder}></OrderDetails>
          }
        </Modal>}
    </div>
  );
}

export default App;
