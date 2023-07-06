import React, { FC } from 'react';
import DetailsGeneratedOrder from '../../components/modal/components/generated-order/generated-order';
import styles from "./generated-order-page.module.css"

const GeneratedOrderPage: FC = () => {
  return (
    <>
      {<main className={styles.container}>
        <DetailsGeneratedOrder showNumber={true} />
      </main>}
    </>
  );
};

export default GeneratedOrderPage;
