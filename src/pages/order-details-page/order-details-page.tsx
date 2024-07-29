import React, { FC } from 'react';
import OrderDetails from '../../components/modal/components/order-details/order-details';
import withModal from '../../components/hocs/with-modal';
import styles from './order-details-page.module.css';

const WithModalOrderDetails = withModal(OrderDetails);

const OrderDetailsPage: FC = () => {
  return (
    <main className={styles.container}>
      <WithModalOrderDetails />
    </main>
  );
};

export default OrderDetailsPage;
