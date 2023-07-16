import React, { memo, FC } from 'react';
import { TOrderStatusSets } from '../../../../types/order';
import styles from "./order-info.module.css"

type TOrderInfoProps = {
  total: number;
  totalToday: number;
  ordersStatusSets: TOrderStatusSets;
};

const OrderInfo: FC<TOrderInfoProps> = memo(({ ordersStatusSets, total, totalToday }) => {
  const { done, pending } = ordersStatusSets;

  return (
    <section className={styles.infoContainer}>
      <div className={`${styles.lists} mb-15`}>
        <div className={styles.statusContainer}>
          <h2 className="text text_type_main-medium pb-6">Готовы:</h2>
          <ul className={`${styles.ordersList} statusHighlighting text text_type_digits-default`}>
            {
              done.length ? done.map((item: number) => <li key={item}>{item}</li>) : null
            }
          </ul>
        </div>
        <div className={`${styles.statusContainer} ml-9`}>
          <h2 className="text text_type_main-medium pb-6">В работе:</h2>
          <ul className={`${styles.ordersList} text text_type_digits-default`}>
            {
              pending.length && pending.map((item: number) => <li key={item}>{item}</li>)
            }
          </ul>
        </div>
      </div>

      <div className="mb-15">
        <h2 className="text text_type_main-medium">Выполнено за все время:</h2>
        <p className={`${styles.total} text text_type_digits-large`}>{total}</p>
      </div>
      <div>
        <h2 className="text text_type_main-medium">Выполнено за сегодня:</h2>
        <p className={`${styles.total} text text_type_digits-large`}>{totalToday}</p>
      </div>
    </section>
  );
});

export default OrderInfo;
