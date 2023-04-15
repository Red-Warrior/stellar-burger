import React from 'react';
import Card from "../card/card";
import styles from './collection.module.css'

const Collection = ({title, ingredients}) => {
  return (
    <section className="pb-10">
      <h2 className={`${styles.title} text text_type_main-medium mb-6`}>{title}</h2>
      <div className={`${styles.list} pl-4 pr-4`}>
        {
          ingredients.map(item =>
            <Card key={item._id} ingredient={item} />)
        }
      </div>
    </section>
  );
};

export default Collection;
