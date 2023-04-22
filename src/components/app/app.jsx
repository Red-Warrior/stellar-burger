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

import { IngredientsContext } from "../../services/appContext";
import { ModalContext } from "../../services/modalContext";
import { OrderNumberContext } from "../../services/orderNumberContext";

const App = () => {
  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    data: []
  });

  const [visible, setVisible] = useState(false);
  const [modalIngredient, setModalIngredient] = useState(null);
  const [orderNumber, setOrderNumber] = useState(null);

  const handleOpenModal = useCallback((payload) => {
    if (payload) {
      setModalIngredient(payload);
    }
    setVisible(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    if (modalIngredient) {
      setModalIngredient(null);
    }
    setVisible(false);
  }, [modalIngredient]);

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
      <IngredientsContext.Provider value={data}>
        <ModalContext.Provider value={handleOpenModal}>
          <OrderNumberContext.Provider value={{orderNumber, setOrderNumber}}>
            <AppHeader />
            {isLoading && 'Загрузка...'}
            {hasError && 'Произошла ошибка'}
            {
              !isLoading &&
              !hasError &&
              data.length && (
                <main className={styles.container}>
                  <BurgerIngredients />
                  <BurgerConstructor />
                </main>
              )
            }
            {
              visible && modalIngredient ? (
                  <Modal
                    extraClass={modalStyles.ingredient}
                    title="Детали ингредиента"
                    handleCloseModal={handleCloseModal}
                  >
                    <IngredientDetails selectedIngredient={modalIngredient} />
                  </Modal>)
                :
                visible ?
                  (
                    <Modal
                      extraClass={modalStyles.order}
                      handleCloseModal={handleCloseModal}
                    >
                      <OrderDetails />
                    </Modal>)
                  :
                  null
            }
          </OrderNumberContext.Provider>
        </ModalContext.Provider>
      </IngredientsContext.Provider>
    </div>
  );
}

export default App;
