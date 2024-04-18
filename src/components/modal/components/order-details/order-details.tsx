import React, { FC, useCallback } from "react";
import icon from "../../../../images/done.png";
import styles from "./order-details.module.css";

import { useParams } from 'react-router-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { useNavigate } from "react-router-dom";
import { useAppDispatch } from '../../../../store/hooks';
import { REMOVE_ALL_STUFFING } from '../../../../store/burger-constructor/actions';
import { RESET_INGREDIENTS_COUNTER } from '../../../../store/ingredients/actions';
import { REMOVE_ORDER } from '../../../../store/order/actions';

type TOrderDetails = {
  handleCloseModal: () => void;
};

type THandleCloseModalCallback = () => void;

const OrderDetails: FC<TOrderDetails> = ({ handleCloseModal }) => {
  const { number } = useParams();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCloseOrderModal = useCallback<THandleCloseModalCallback>(() => {
    dispatch({ type: REMOVE_ALL_STUFFING });
    dispatch({ type: RESET_INGREDIENTS_COUNTER });
    dispatch({ type: REMOVE_ORDER });

    navigate("/");
  }, [navigate, dispatch]);

  return (
    <>
      <div className={`${styles.title} title`}>
        <div className={`${styles.closeIcon} closeIcon`}>
          <CloseIcon onClick={handleCloseOrderModal} type="primary" />
        </div>
      </div>
      <div className={styles.order}>
        <h2 className={`${styles.number} text text_type_digits-large mt-4 mb-8`}>
          {number}
        </h2>
        <p className="text text_type_main-medium mb-15">
          идентификатор заказа
        </p>
        <img src={icon} alt="Иконка обозначающая, что заказ принят" />
        <p className="text text_type_main-default mt-15">
          Ваш заказ начали готовить
        </p>
        <p className="text text_type_main-default text_color_inactive mt-2">
          Дождитесь готовности на орбитальной станции
        </p>
      </div>
    </>
  );
};

export default OrderDetails;
