import React, { FC, useEffect } from 'react';
import FeedsLine from '../../../order-description/components/feeds-line/feeds-line';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { getOrders, getWsData } from '../../../../store/ws/selectors';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from '../../../../store/ws/actions';
import { getCookie } from '../../../../utils/cookie';
import styles from "../../../order-description/components/feeds-line/feeds-line.module.css"

const ProfileHistory: FC = () => {
  const { wsConnected } = useAppSelector(getWsData);
  const { orders } = useAppSelector(getOrders);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      payload: `${process.env.REACT_APP_BURGER_WS}?token=${getCookie("token")}`
    });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [dispatch]);

  return wsConnected && orders && orders.length ? (
    <FeedsLine extraClass={`${styles.containerHistory} mt-10`} showStatus={true} orders={orders.filter(Boolean)} />
  ) : null;
};

export default ProfileHistory;
