import React, { memo, useReducer, useContext, useMemo, useEffect } from "react";
import {
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import { postOrder } from "../../utils/api";
import { getRandNumber, getRandArray } from "../../utils/gerRandom";
import styles from "./burger-constructor.module.css";

import { IngredientsContext } from "../../services/appContext";
import { ModalContext } from "../../services/modalContext";
import { OrderNumberContext } from "../../services/orderNumberContext";

function getTotalPrice(bun, stuffing) {
  return stuffing.reduce((acc, item) => acc + item.price, 0) + bun.price * 2;
}

const ingredientsInitialState = {bun: {}, stuffing: [], totalPrice: 0};

function reducer(state, action) {
  switch (action.type) {
    case "set":
      const bun = action.payload.bun[getRandNumber(action.payload.bun.length - 1)];
      const stuffing = getRandArray(action.payload.stuffing, 10);
      return {
        bun,
        stuffing,
        totalPrice: getTotalPrice(bun, stuffing)
      };
    case "reset":
      return ingredientsInitialState;
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

const BurgerConstructor = memo(() => {

  const ingredients = useContext(IngredientsContext);
  const handleOpenModal = useContext(ModalContext);
  const {setOrderNumber} = useContext(OrderNumberContext);

  const [ingredientsState, ingredientsDispatcher] = useReducer(reducer, ingredientsInitialState, undefined);

  const makeOrder = (e) => {
    e.preventDefault();

    const ingredientsId = [ingredientsState.bun, ...ingredientsState.stuffing].map(item => item._id);

    postOrder(`${process.env.REACT_APP_BURGER_API_URL}/orders`, {
      method: "POST",
      body: JSON.stringify({ingredients: ingredientsId}),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
      .then(payload => {
        setOrderNumber(payload.order.number)
        handleOpenModal();
      })
      .catch(e => {
        console.log(e);
      });
  }

  const ingredientsSet = useMemo(() => ingredients.reduce((acc, item) => {
    if (!acc.bun && !acc.stuffing) {
      acc.bun = [];
      acc.stuffing = [];
    }
    if (item.type !== "bun") {
      acc.stuffing.push(item);
    } else {
      acc.bun.push(item);
    }
    return acc;
  }, {}), [ingredients]);

  useEffect(() => {

    ingredientsDispatcher({type: "set", payload: ingredientsSet});
  }, [ingredientsSet]);

  const bunStyle = `${styles.bun} ml-8`;
  const {bun, stuffing, totalPrice} = ingredientsState;

  return (
    <div className={`${styles.constructor} pt-25`}>
      {
        ingredientsState.totalPrice && (
          <>
            <div className={`${styles.ingredients} mb-10 ml-4`}>
              <ConstructorElement
                type="top"
                isLocked={true}
                text={`${bun.name} (верх)`}
                price={bun.price}
                thumbnail={bun.image_mobile}
                extraClass={bunStyle}
              />
              <div className={`${styles.list} custom-scroll pr-2`}>
                {
                  stuffing.map((item, i) => {
                    return (
                      <div className={styles.element} key={item._id + i}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                          text={item.name}
                          price={item.price}
                          thumbnail={item.image_mobile}
                          extraClass="ml-2"
                        />
                      </div>
                    )
                  })
                }
              </div>
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${bun.name} (низ)`}
                price={bun.price}
                thumbnail={bun.image_mobile}
                extraClass={bunStyle}
              />
            </div>

            <div className={`${styles.cost} mr-4`}>
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
          </>)
      }
    </div>
  );
});

export default BurgerConstructor;
