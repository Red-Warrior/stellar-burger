import React, { FC, ReactElement, useEffect, useMemo, useRef, useState } from "react";
import { nanoid } from "nanoid";
import { useDrop } from 'react-dnd';
import { useLocation, useNavigate } from "react-router-dom";
import { Button, ConstructorElement, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import DefaultConstructorElement from "./components/default-constructor-element/default-constructor-element";
import ConstructorIngredient from "./components/constructor-ingredient/constructor-ingredient";
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getChosenIngredients } from "../../store/burger-constructor/selectors"
import { SET_BUN, SET_STUFFING_INGREDIENT } from "../../store/burger-constructor/actions";
import { INCREASE_INGREDIENTS_COUNT } from "../../store/ingredients/actions";
import { CLOSE_MODAL, postNewOrder } from "../../store/order/actions";
import { getUserData } from "../../store/user/selectors";
import { TAddedIngredient, TIngredient } from '../../types/ingredient';
import { getStoreOrder, isModal } from '../../store/order/selectors';
import styles from "./burger-constructor.module.css";

const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const stuffingContainer = useRef<HTMLDivElement | null>(null);

  const [isScroll, setIsScroll] = useState<boolean>(false);
  const { userName } = useAppSelector(getUserData);

  const orderNumber = useAppSelector(getStoreOrder);
  const modalStatus = useAppSelector(isModal);

  const ingredients = useAppSelector(getChosenIngredients);
  const { bun, stuffing } = ingredients;

  const isPrice = (): boolean => !!bun || !!stuffing.length;

  const chosenIngredientsId = (): string[] => {
    if (!bun) {
      return stuffing.map((item: TIngredient) => item._id);
    }
    if (!stuffing.length) {
      return [bun._id];
    }
    return [bun, ...stuffing].map(item => item._id);
  };

  const totalPrice = useMemo<number>(() => {
    if (!bun && !stuffing.length) {
      return 0;
    }

    let totalPrice = stuffing.reduce((acc: number, item: TIngredient) => acc + item?.price, 0);
    if (bun) {
      totalPrice += bun.price * 2;
    }
    return totalPrice;
  }, [bun, stuffing]);

  useEffect(() => {
    if (stuffingContainer.current && stuffingContainer.current?.clientHeight >= 464) {
      setIsScroll(true)
    }
  }, [setIsScroll]);

  const makeOrder = (e: React.SyntheticEvent<Element, Event>): void => {
    e.preventDefault();

    if (!userName) {
      return navigate("/login", { state: { from: location } });
    }
    if (isPrice()) {
      dispatch(postNewOrder({ ingredients: chosenIngredientsId() }));
    } else {
      alert("Соберите бургер прежде чем оформлять заказ!");
    }
  }

  const [{ isOverCurrent }, dropTargetRefBun] = useDrop({
    accept: "bun",
    drop(item: TIngredient) {
      dispatch({ type: SET_BUN, payload: item })
      dispatch({ type: INCREASE_INGREDIENTS_COUNT, payload: item._id })
    },
    collect: monitor => ({
      isOverCurrent: monitor.isOver({ shallow: true }),
    })
  });

  const [{ isHover }, dropTargetRef] = useDrop({
    accept: "stuffing",
    drop(item: TIngredient | TAddedIngredient) {
      if (!("sortId" in item)) {
        dispatch({
          type: SET_STUFFING_INGREDIENT,
          payload: { ...item, sortId: nanoid(10) } as TAddedIngredient
        });
        dispatch({
          type: INCREASE_INGREDIENTS_COUNT,
          payload: item._id
        });
      }
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    })
  });

  const bunStyle = `${styles.bun} ml-8`;

  useEffect(() => {
    if (modalStatus) {
      dispatch({ type: CLOSE_MODAL });
      navigate(`order/${orderNumber}`, { state: { background: location } });
    }
  }, [modalStatus, orderNumber, dispatch, navigate, location]);

  return (
    <div className={`${styles.constructor} pt-25`}>
      <div ref={dropTargetRefBun} className={`${styles.ingredients} mb-10 ml-4`}>
        {
          !bun ?
            <DefaultConstructorElement
              extraClass={bunStyle}
              isHover={isOverCurrent}
              type="top"
              text="Выберите булочку" />
            :
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image_mobile}
              extraClass={bunStyle}
            />
        }
        <div ref={elem => {
          dropTargetRef(elem);
          stuffingContainer.current = elem;
        }} className={`${styles.list} ${isScroll ? styles.scroll : ""} custom-scroll pr-2`}>
          {
            !stuffing.length
              ?
              <DefaultConstructorElement extraClass={bunStyle} isHover={isHover} text="Выберите начинку" />
              :
              stuffing.map((item: TAddedIngredient, index: number): ReactElement => <ConstructorIngredient
                key={item.sortId}
                item={item}
                index={index}
                sortId={item.sortId}
              />)
          }
        </div>
        {
          !bun ?
            <DefaultConstructorElement
              extraClass={bunStyle}
              isHover={isOverCurrent}
              type="bottom"
              text="Выберите булочку" />
            :
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image_mobile}
              extraClass={bunStyle}
            />
        }
      </div>
      <div className={`${styles.cost} mr-6`}>
        <span className="text text_type_digits-medium mr-2">{totalPrice}</span>
        <CurrencyIcon type="primary" />
        <Button
          extraClass="ml-10"
          type="primary"
          htmlType="submit"
          size="large"
          onClick={makeOrder}
        >
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};

export default BurgerConstructor;
