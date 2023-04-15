import React from 'react';
import {
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css'

const BurgerConstructor = ({ingredients}) => {

  const ingredientsSets = ingredients.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {})

  const rand = (max) => Math.round(Math.random() * max);

  const currentBun = ingredientsSets.bun[rand(ingredientsSets.bun.length - 1)];

  const currentMain = Array.from({length: 10}).map(_ =>
    ingredientsSets.main[rand(ingredientsSets.main.length - 1)]);

  const totalPrice = currentMain.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className={`${styles.constructor} pt-25`}>
      <div className={`${styles.ingredients} mb-10`}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={currentBun.name}
          price={currentBun.price}
          thumbnail={currentBun.image_mobile}
          extraClass="ml-10"
        />
        <div className={`${styles.list} custom-scroll`}>
          {
            currentMain.map((item, i) => {
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
          text={currentBun.name}
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
