import React, { memo, FC } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '../../../order-description/components/order-card/order-card.module.css';

type TPriceDetailProps = {
  price: number | string
  extraClass?: string
};

const PriceDetail: FC<TPriceDetailProps> = memo(({ price, extraClass }) => {
  return (
    <div className={`${styles.cost} ${extraClass}`}>
      <span className="text text_type_digits-default mr-3">{price}</span>
      <CurrencyIcon type="primary"></CurrencyIcon>
    </div>
  );
});

export default PriceDetail;
