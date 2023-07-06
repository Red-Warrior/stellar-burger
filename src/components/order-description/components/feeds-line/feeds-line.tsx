import React, { memo, FC } from 'react';
import OrderCard from '../order-card/order-card';
import { TOrder } from '../../../../types/order';
import styles from "./feeds-line.module.css"

type TFeedsLineProps = {
  orders: TOrder[];
  showStatus?: boolean | undefined;
  extraClass?: string;
};

const FeedsLine: FC<TFeedsLineProps> = memo(({ orders, showStatus, extraClass }) => {
  return (
    <div className={`${styles.container} ${extraClass} custom-scroll pr-2`}>
      {orders.map((order: TOrder) => (<OrderCard key={order._id} {...{ ...order, showStatus }} />))}
    </div>
  );
});

export default FeedsLine;
