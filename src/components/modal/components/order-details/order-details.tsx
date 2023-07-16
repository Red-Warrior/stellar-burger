import React, { FC } from "react";
import icon from "../../../../images/done.png";
import styles from "./order-details.module.css";

import { useParams } from 'react-router-dom';

const OrderDetails: FC = () => {
  const { number } = useParams();

  return (
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
  );
};

export default OrderDetails;
