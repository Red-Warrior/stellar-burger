import React, { useState, useEffect } from 'react';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import styles from './app.module.css';

const url = 'https://norma.nomoreparties.space/api/ingredients';

const App = () => {
  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    data: []
  });

  useEffect(() => {
    setState({...state, hasError: false, isLoading: true});
    fetch(url)
      .then(res => res.json())
      .then(payload => setState({...state, data: payload.data, isLoading: false}))
      .catch(e => {
        setState({...state, hasError: true, isLoading: false});
        console.log(e);
      });
    // eslint-disable-next-line
  }, [])

  const {data, isLoading, hasError} = state;

  return (
    <div className={styles.app}>
      <AppHeader />
      {isLoading && 'Загрузка...'}
      {hasError && 'Произошла ошибка'}
      {!isLoading &&
        !hasError &&
        data.length && (
          <main className={styles.container}>
            <BurgerIngredients ingredients={data} />
            <BurgerConstructor ingredients={data} />
          </main>
        )
      }
    </div>
  );
}

export default App;
