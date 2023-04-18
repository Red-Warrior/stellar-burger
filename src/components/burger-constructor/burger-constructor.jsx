import React from 'react';
import {
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css'

const BurgerConstructor = ({ingredients}) => {

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

  return (
    <div className={`${styles.constructor} pt-25`}>
      <div className={`${styles.ingredients} mb-10`}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${currentBun.name} (верх)`}
          price={currentBun.price}
          thumbnail={currentBun.image_mobile}
          extraClass="ml-10"
        />
        <div className={`${styles.list} custom-scroll`}>
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
          extraClass="ml-10"
        />
      </div>
      <div className={`${styles.cost} mr-8`}>
        <span className="text text_type_digits-medium mr-2">{totalPrice}</span>
        <CurrencyIcon type="primary" />
        <Button extraClass="ml-10" type="primary" htmlType="button" size="large">Оформить заказ</Button>
      </div>

    </div>
  );
};

export default BurgerConstructor;
