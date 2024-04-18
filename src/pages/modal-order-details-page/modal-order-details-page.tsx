import React, { FC } from 'react';
import OrderDetails from '../../components/modal/components/order-details/order-details';
import withModal from '../../components/hocs/with-modal';
import styles from '../../components/hocs/modal.module.css';

const style = `${styles.modal} ${styles.order}`;
const WithModalOrderDetails = withModal(OrderDetails);

const ModalOrderDetailsPage: FC = () => {
  return (<WithModalOrderDetails style={style} />)
};

export default ModalOrderDetailsPage;
