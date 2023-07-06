import React, { memo, FC } from 'react';
import styles from "./ingredient-image.module.css"

type TIngredientImageProps = {
  image: string
  description?: string
  counter?: number
  index?: number;
};

const IngredientImage: FC<TIngredientImageProps> = memo((
  {
    image,
    counter,
    description,
    index
  }) => {
  const translateStyles = { zIndex: 100 - (index ?? 0), transform: `translateX(-${!index || index * 15}px` }

  const isSequence = index !== undefined ? translateStyles : {};

  return (
    <div
      style={isSequence}
      className={styles.container}>
      <div className={styles.fill}>
        <img
          className={styles.ingredientImg}
          width={112}
          height={56}
          src={image}
          alt={description || "Изображение ингредиента"} />
        {
          counter ?
            <span className={`${styles.remainingNumber} text text_type_main-default`}>
            +{counter}
          </span> : null
        }
      </div>
    </div>
  );
});

export default IngredientImage;
