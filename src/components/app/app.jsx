import React, { useState, useEffect, useCallback } from 'react';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import IngredientDetails from "../modal/components/ingredient-details/ingredient-details";
import OrderDetails from "../modal/components/order-details/order-details";
import { getIngredients } from "../../utils/api";
import styles from './app.module.css';
import modalStyles from '../modal/modal.module.css'

const App = () => {
  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    data: []
  });

  const keyHandler = (e) => {
    if (e.key === 'Escape') {
      handleCloseModal();
    }
  };

  const [visible, setVisible] = useState({
    ingredient: false,
    order: false,
    payload: null
  });

  const handleOpenModal = useCallback((payload) => {
    setVisible({
      ingredient: typeof payload === 'object',
      order: typeof payload === 'number',
      payload: payload
    })
  }, []);

  const handleCloseModal = useCallback(() => {
    setVisible({ingredient: false, order: false, payload: null});
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

  useEffect(() => {
    document.addEventListener("keydown", keyHandler)
    return () => {
      document.removeEventListener("keydown", keyHandler)
    }
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
        (visible.ingredient || visible.order) &&
        <Modal
          extraClass={visible.ingredient ? modalStyles.ingredient : modalStyles.order}
          title={visible.ingredient ? "Детали ингредиента" : ""}
          handleCloseModal={handleCloseModal}
        >
          {
            visible.ingredient ?
              <IngredientDetails payload={visible.payload}></IngredientDetails>
              :
              <OrderDetails payload={visible.payload}></OrderDetails>
          }
        </Modal>}
    </div>
  );
}

export default App;
