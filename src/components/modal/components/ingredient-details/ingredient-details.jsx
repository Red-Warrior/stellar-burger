import React, { memo } from "react";
import ingredientsPropTypes from "../../../../utils/ingredientsPropTypes";
import styles from "./ingredient-details.module.css";
import PropTypes from "prop-types";

const IngredientDetails = memo(({payload}) => {
  const {calories, proteins, fat, carbohydrates} = payload;

  const property = {
    "Калории,ккал": calories,
    "Белки, г": proteins,
    "Жиры, г": fat,
    "Углеводы, г": carbohydrates
  }

  return (
    <div className={styles.container}>
      <img src={payload.image_large} alt={`Изображение: ${payload.name}`} />
      <p className="text text_type_main-medium mt-4">
        {payload.name}
      </p>
      <ul className={`${styles.set} mt-8`}>
        {
          Object.keys(property).map(item =>
            <li key={item} className={styles.component}>
              <span className="text text_type_main-default text_color_inactive">{item}</span>
              <span className="text text_type_digits-default text_color_inactive">{property[item]}</span>
            </li>
          )
        }
      </ul>
    </div>
  );
});

export default IngredientDetails;

IngredientDetails.propTypes = {
  payload: PropTypes.oneOfType([ingredientsPropTypes.isRequired, PropTypes.any]).isRequired
};
