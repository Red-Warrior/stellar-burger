import React from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './card.module.css'

const Card = ({ingredient}) => {
  return (
    <div className={styles.card}>
      <img width="240" height="120" src={ingredient.image} alt={ingredient.name} />
      <div className={`${styles.price} mt-1 mb-1`}>
        <span className="text text_type_digits-default mr-2">{ingredient.price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <div className={`text text_type_main-default ${styles.text}`}>{ingredient.name}</div>
      <Counter count={1} size="default" />
    </div>
  );
};

export default Card;
