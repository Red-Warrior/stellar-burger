import React, { useMemo, useEffect, memo, FC } from 'react';
import { CloseIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientImage from '../../../ui/components/ingredient-image/ingredient-image';
import PriceDetail from '../../../ui/components/price-detail/price-detail';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { getStoreSelectedOrder } from '../../../../store/order/selectors';
import { orderStatus } from '../../../../utils/order-status';
import { getStoreIngredients } from '../../../../store/ingredients/selectors';
import { useParams } from "react-router-dom";
import { getSelectedOrder } from '../../../../store/order/actions';
import { TOrderStatus } from '../../../../types/order';
import styles from './generated-order.module.css';

type TOrderIdField = {
  [key: string]: number;
}

type TGeneratedOrderProps = {
  showNumber?: boolean
  handleCloseModal: () => void;
}

const GeneratedOrder: FC<TGeneratedOrderProps> = memo(({ showNumber, handleCloseModal }) => {
  const dispatch = useAppDispatch();

  const { number } = useParams();

  const { createdAt, name, ingredients: orderIngredientIds, status } = useAppSelector(getStoreSelectedOrder);
  const { ingredientsDataAndCount: ingredients } = useAppSelector(getStoreIngredients);

  const reformattedIngredients = useMemo<Array<string>>(() => {
    return Array.from(new Set(orderIngredientIds))
  }, [orderIngredientIds]);

  const counter = useMemo(() => {
    if (orderIngredientIds && orderIngredientIds.length) {
      return [...orderIngredientIds].reduce((acc: TOrderIdField, id: string) => {
        acc[id] = acc[id] ? acc[id] += 1 : 1;
        return acc;
      }, {});
    }
    return {}
  }, [orderIngredientIds]);

  const totalPrice = useMemo(() => {
    if (orderIngredientIds) {
      return [...orderIngredientIds].reduce((acc: number, ingredientId: string) => {
        acc += ingredients![ingredientId]?.price;
        return acc;
      }, 0)
    }
    return 0
  }, [orderIngredientIds, ingredients]);

  useEffect(() => {
    if (number) {
      dispatch(getSelectedOrder(number));
    }
  }, [number, dispatch]);

  return name ? (
    <>
      <div className={`${styles.title} title`}>
        <p className="text text_type_digits-default">
          {"#" + number}
        </p>
        <div className={`${styles.closeIcon} closeIcon`}>
          <CloseIcon onClick={handleCloseModal} type="primary" />
        </div>
      </div>

      {showNumber && <p className={`${styles.number} text text_type_digits-default`}>
        #{number}
      </p>}
      <h2 className="text text_type_main-medium mt-10 mb-3">
        {name}
      </h2>
      <p className={
        `${styles.status} ${status === "done" ? "statusHighlighting" : ""} mb-15`}
      >
        {orderStatus[status as keyof TOrderStatus]}
      </p>
      <p className="text text_type_main-medium mb-6">
        Состав:
      </p>

      <div className={`${styles.list} ${orderIngredientIds.length > 10 ? styles.scroll : ""} custom-scroll pr-6`}>
        {
          reformattedIngredients.map((id: string) => (
              <div key={id} className={styles.card}>
                <IngredientImage
                  image={ingredients![id].image_mobile}
                  description={ingredients![id].name}
                />
                <p className={`${styles.text} text text_type_main-small ml-4`}>{ingredients![id].name}</p>
                <PriceDetail extraClass="ml-4" price={`${counter[id]} x ${ingredients![id].price}`} />
              </div>
            )
          )
        }
      </div>

      <div className={`${styles.info} mt-10`}>
        <FormattedDate className="text_color_inactive" date={new Date(createdAt)} />
        <PriceDetail price={totalPrice} />
      </div>
    </>
  ) : null;
});

export default GeneratedOrder;
