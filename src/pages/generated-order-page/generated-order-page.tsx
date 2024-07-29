import React, { FC } from 'react';
import DetailsGeneratedOrder from '../../components/modal/components/generated-order/generated-order';
import withModal from '../../components/hocs/with-modal';
import styles from "./generated-order-page.module.css"

const WithModalGeneratedOrder = withModal(DetailsGeneratedOrder);

const GeneratedOrderPage: FC = () => {
  return (
    <>
      {<main className={styles.container}>
        <WithModalGeneratedOrder />
      </main>}
    </>
  );
};

export default GeneratedOrderPage;
