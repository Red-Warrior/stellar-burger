import React, { FC, useEffect } from 'react';
import FeedsLine from '../../../order-description/components/feeds-line/feeds-line';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { getOrders } from '../../../../store/ws/selectors';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from '../../../../store/ws/actions';
import { getCookie } from '../../../../utils/cookie';
import styles from "../../../order-description/components/feeds-line/feeds-line.module.css"

const ProfileHistory: FC = () => {
  const dispatch = useAppDispatch();

  const { orders } = useAppSelector(getOrders);

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      payload: `${process.env.REACT_APP_BURGER_WS}?token=${getCookie("token")}`
    });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [dispatch]);

  return orders && orders.length ? (
    <FeedsLine extraClass={`${styles.containerHistory} mt-10`} showStatus={true} orders={orders.filter(Boolean)} />
  ) : null;
};

export default ProfileHistory;
