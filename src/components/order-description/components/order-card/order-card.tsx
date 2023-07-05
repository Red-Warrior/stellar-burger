import React, { useMemo, memo, FC } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import PriceDetail from '../../../ui/components/price-detail/price-detail';
import IngredientImage from '../../../ui/components/ingredient-image/ingredient-image';
import { getStoreIngredients } from '../../../../store/ingredients/selectors';
import { TOrder } from '../../../../types/order';
import { TOrderStatus } from '../../../../types/order';
import { orderStatus } from '../../../../utils/order-status';
import styles from "./order-card.module.css"

type TIngredientsWithIds = {
  id: string;
  key: number;
};

const OrderCard: FC<TOrder & { showStatus: boolean | undefined }> = memo((
  {
    _id,
    number,
    createdAt,
    name,
    ingredients,
    status,
    showStatus
  }) => {
  const location = useLocation()
  const navigate = useNavigate();

  const { ingredientsDataAndCount } = useSelector(getStoreIngredients);

  const navigateToOrderDetails = () => {
    navigate(`${number}`, { state: { background: location } });
  };

  const totalPrice = useMemo(() => {
    return ingredients.reduce((acc: number, ingredientId: string) => {
      acc += ingredientsDataAndCount![ingredientId]?.price;
      return acc;
    }, 0)
  }, [ingredients, ingredientsDataAndCount]);

  const arrOfIngredientsByAllowedLength = ingredients.length > 6 ? ingredients.slice(0, 6) : ingredients;
  const ingredientsWithIds = arrOfIngredientsByAllowedLength
    .reduce((acc: Array<TIngredientsWithIds>, id: string, index) => {
      acc.push({
        id: id,
        key: index,
      })
      return acc;
    }, [])

  return (
    <section onClick={navigateToOrderDetails} className={`${styles.order} p-6 pb-0 `}>
      <p className={`${styles.number} text text_type_digits-default`}>{`#${number}`}</p>
      <p className={`${styles.date} text text_type_main-default text_color_inactive`}>
        <FormattedDate date={new Date(createdAt)} />
      </p>

      <div className={styles.mealName}>
        <h2 className={`${styles.mealHeader} text text_type_main-medium`}>{name}</h2>
        {
          showStatus ?
            <p className={
              `${styles.status} text text_type_main-default ${status === "done" ? "statusHighlighting" : ""} mt-2`
            }>
              {orderStatus[status as keyof TOrderStatus]}
            </p> : null
        }
      </div>

      <div className={styles.tape}>
        {
          ingredientsWithIds.map(({ id, key }, index) => (
            <IngredientImage
              key={key}
              image={ingredientsDataAndCount![id]?.image_mobile}
              counter={(ingredients.length > 6 && index === 5) ?
                ingredients.length - arrOfIngredientsByAllowedLength.length :
                undefined}
              description={ingredientsDataAndCount![id]?.name}
              index={index}
            />
          ))
        }
      </div>
      <PriceDetail price={totalPrice} extraClass={styles.cost}></PriceDetail>
    </section>
  );
});

export default OrderCard;
