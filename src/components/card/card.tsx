import React, { FC, memo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDrag } from 'react-dnd';
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppSelector } from '../../store/hooks';
import { getIngredientsDataAndCount } from "../../store/ingredients/selectors";
import { getChosenIngredients } from "../../store/burger-constructor/selectors";
import { TIngredient } from '../../types/ingredient';
import styles from "./card.module.css";

type TCardProps = {
  ingredient: TIngredient;
};

const Card: FC<TCardProps> = memo(({ ingredient }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const ingredientCount = useAppSelector(getIngredientsDataAndCount)![ingredient._id].count;
  const hasBun = useAppSelector(getChosenIngredients).bun?.name;

  const [{ opacity }, dragRef] = useDrag({
    type: ingredient.type === "bun" ? "bun" : "stuffing",
    item: ingredient,
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });

  const handleOpenModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    e.preventDefault();

    navigate(`ingredients/${ingredient._id}`, { state: { background: location } });
  };

  return (
    <div
      ref={dragRef}
      className={styles.card}
      onClick={(e) => handleOpenModal(e)}>
      <img
        style={{ opacity }}
        width="240"
        height="120"
        src={ingredient.image}
        alt={ingredient.name} />
      <div className={`${styles.price} mt-1 mb-2`}>
        <span className="text text_type_digits-default mr-2">{ingredient.price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <div className={`text text_type_main-default ${styles.text}`}>{ingredient.name}</div>
      {
        (hasBun && ingredient.name === hasBun) ?
          <Counter count={2} size="default" />
          :
          (ingredient.type !== "bun" && ingredientCount > 0) ?
            <Counter count={ingredientCount} size="default" />
            :
            null
      }
    </div>
  );
});

export default Card;
