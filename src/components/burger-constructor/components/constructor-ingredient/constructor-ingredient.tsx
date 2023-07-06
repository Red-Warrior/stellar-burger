import React, { memo, useRef, FC } from 'react';
import { useDrag, useDrop } from "react-dnd";
import { Identifier } from 'dnd-core';
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { getChosenIngredients } from "../../../../store/burger-constructor/selectors";
import {
  DELETE_STUFFING_INGREDIENT,
  REPLACE_WITH_SORTED_STUFFING
} from "../../../../store/burger-constructor/actions";
import { DECREASE_INGREDIENTS_COUNT } from "../../../../store/ingredients/actions";
import { TAddedIngredient } from '../../../../types/ingredient';
import styles from "./constructor-ingredient.module.css";

type TConstructorIngredientProps = {
  item: TAddedIngredient;
  index: number;
  sortId: string;
};

const ConstructorIngredient: FC<TConstructorIngredientProps> = memo(({ item, index, sortId }) => {
  const dispatch = useAppDispatch();

  const stuffing = useAppSelector(getChosenIngredients).stuffing;
  const ref = useRef<HTMLDivElement | null>(null);

  const deleteIngredient = (item: TAddedIngredient): void => {
    dispatch({ type: DELETE_STUFFING_INGREDIENT, payload: item.sortId });
    dispatch({ type: DECREASE_INGREDIENTS_COUNT, payload: item._id })
  }

  const [{ handlerId }, dropRef] = useDrop<TAddedIngredient, unknown, { handlerId: Identifier | null }>({
    accept: "stuffing",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },

    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      const clientOffset = monitor.getClientOffset() || { y: 0 };

      const hoverClientY = clientOffset.y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      const sortedStuffingOrder = [...stuffing];
      const draggedElem = sortedStuffingOrder.splice(dragIndex, 1);
      sortedStuffingOrder.splice(hoverIndex, 0, draggedElem[0]);

      if (stuffing.find((stuff: TAddedIngredient) => stuff.sortId === item.sortId)) {
        dispatch({
          type: REPLACE_WITH_SORTED_STUFFING,
          payload: sortedStuffingOrder
        })
      }
      item.index = hoverIndex
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "stuffing",
    item: () => {
      return { sortId, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? 0 : 1
  drag(dropRef(ref))

  return (
    <div
      ref={ref}
      style={{ opacity: opacity }}
      className={`${styles.element} ${item.type !== "bun" ? styles.draggable : ""}`}
      data-handler-id={handlerId}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item?.image_mobile}
        extraClass="ml-2"
        handleClose={() => deleteIngredient(item)}
      />
    </div>
  );
});

export default ConstructorIngredient;
