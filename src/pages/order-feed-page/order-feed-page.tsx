import React, { useEffect, useMemo, FC } from 'react';
import FeedsLine from '../../components/order-description/components/feeds-line/feeds-line';
import OrderInfo from '../../components/order-description/components/order-info/order-info';
import { getOrders } from '../../store/ws/selectors';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from '../../store/ws/actions';
import { getDoneAndRestsSets } from '../../utils/getOrderStatusSets';
import { TOrderStatusSets } from '../../types/order';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import styles from "./order_feed-page.module.css"
import stylesOfFeedsLine from "../../components/order-description/components/feeds-line/feeds-line.module.css"

const OrderFeedPage: FC = () => {
  const dispatch = useAppDispatch();

  const { orders, total, totalToday } = useAppSelector(getOrders);

  const ordersStatusSets = useMemo<TOrderStatusSets>(() => {
    return getDoneAndRestsSets(orders);
  }, [orders]);

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      payload: process.env.REACT_APP_BURGER_WS_ALL as string
    });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [dispatch]);

  return (orders && orders.length) ? (
    <div className={styles.container}>
      <h1 className={`${styles.title} text text_type_main-large`}>Лента заказов</h1>
      <div className={styles.modules}>
        <FeedsLine extraClass={stylesOfFeedsLine.containerFeedsLine} orders={orders.filter(Boolean)} />
        <OrderInfo ordersStatusSets={ordersStatusSets} total={total} totalToday={totalToday} />
      </div>
    </div>
  ) : null;
};

export default OrderFeedPage;
