import React, { memo } from 'react';
import PropTypes from "prop-types";
import {
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientsPropTypes from "../../utils/ingredientsPropTypes";
import styles from './burger-constructor.module.css';

const BurgerConstructor = memo(({ingredients, handleOpenModal}) => {

  const {bun, stuffing} = ingredients.reduce((acc, item) => {
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
  }, {});

  const rand = (max) => Math.round(Math.random() * max);

  const currentBun = bun[rand(bun.length - 1)];

  const currentStuffing = Array.from({length: 10}).map(_ => stuffing[rand(stuffing.length - 1)]);

  const totalPrice = currentStuffing.reduce((acc, item) => acc + item.price, 0) + currentBun.price * 2;

  const bunStyle = `${styles.bun} ml-8`;

  return (
    <div className={`${styles.constructor} pt-25`}>
      <div className={`${styles.ingredients} mb-10 ml-4`}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${currentBun.name} (верх)`}
          price={currentBun.price}
          thumbnail={currentBun.image_mobile}
          extraClass={bunStyle}
        />
        <div className={`${styles.list} custom-scroll pr-2`}>
          {
            currentStuffing.map((item, i) => {
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
          text={`${currentBun.name} (низ)`}
          price={currentBun.price}
          thumbnail={currentBun.image_mobile}
          extraClass={bunStyle}
        />
      </div>

      <div className={`${styles.cost} mr-4`}>
        <span className="text text_type_digits-medium mr-2">{totalPrice}</span>
        <CurrencyIcon type="primary" />
        <Button
          extraClass="ml-10"
          type="primary"
          htmlType="button"
          size="large"
          onClick={() => handleOpenModal(totalPrice)}
        >
          Оформить заказ
        </Button>
      </div>
    </div>
  );
});

export default BurgerConstructor;

BurgerConstructor.propsTypes = {
  ingredients: PropTypes.arrayOf(ingredientsPropTypes.isRequired).isRequired,
  handleOpenModal: PropTypes.func.isRequired
};
