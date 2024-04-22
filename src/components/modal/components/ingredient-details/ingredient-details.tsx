import React, { useMemo, FC } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from '../../../../store/hooks';
import { getStoreIngredients } from "../../../../store/ingredients/selectors";
import { TIngredient } from '../../../../types/ingredient';
import styles from "./ingredient-details.module.css";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

type TProperty = {
  [key: string]: number;
};

type TIngredientDetails = {
  handleCloseModal: () => void;
};

const IngredientDetails: FC<TIngredientDetails> = ({ handleCloseModal }) => {
  const { ingredients } = useAppSelector(getStoreIngredients);
  const { id } = useParams();

  const currentIngredient = useMemo(() => {
    if (ingredients.length) {
      return ingredients.find((ingredient: TIngredient) => ingredient._id === id)
    }
    return undefined;
  }, [ingredients, id]);

  const property = useMemo<TProperty | undefined>(() => {
    if (currentIngredient) {
      return {
        "Калории,ккал": currentIngredient.calories,
        "Белки, г": currentIngredient.proteins,
        "Жиры, г": currentIngredient.fat,
        "Углеводы, г": currentIngredient.carbohydrates
      }
    }
    return undefined;
  }, [currentIngredient]);

  return (currentIngredient && property) ? (
    <>
      <div className={`${styles.title} title`}>
        <h2 className="text text_type_main-large">
          Детали ингредиента
        </h2>
        <div className={`${styles.closeIcon} closeIcon`}>
          <CloseIcon onClick={handleCloseModal} type="primary" />
        </div>
      </div>
      <div className={styles.container}>
        <img src={currentIngredient.image_large} alt={`Изображение: ${currentIngredient.name}`} />
        <p data-madal="modal" className="text text_type_main-medium mt-4">
          {currentIngredient.name}
        </p>
        <ul className={`${styles.set} mt-8`}>
          {
            Object.keys(property).map(item =>
              <li key={item} className={styles.component}>
                <span className="text text_type_main-default text_color_inactive">{item}</span>
                <span
                  className="text text_type_digits-default text_color_inactive">{property[item as keyof typeof property]}</span>
              </li>
            )
          }
        </ul>
      </div>
    </>
  ) : null
};

export default IngredientDetails;
