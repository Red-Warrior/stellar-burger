import React, { memo, ReactElement, FC } from "react";
import Card from "../card/card";
import { TIngredient } from '../../types/ingredient';
import styles from "./category.module.css";

type TCategoryProps = {
  title: string;
  ingredients: TIngredient[];
  extraClass: string;
};

const Category: FC<TCategoryProps> = memo(({ title, ingredients, extraClass }) => {
  return (
    <section className={`mt-10 ${extraClass}`}>
      <h2 className={`${styles.title} text text_type_main-medium mb-6`}>{title}</h2>
      <div className={`${styles.list} pl-4 pr-4`}>
        {
          ingredients.map((item: TIngredient): ReactElement => <Card key={item._id} ingredient={item} />)
        }
      </div>
    </section>
  );
});

export default Category;
