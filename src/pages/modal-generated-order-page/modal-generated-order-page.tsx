import React, { FC } from 'react';
import DetailsGeneratedOrder from '../../components/modal/components/generated-order/generated-order';
import withModal from '../../components/hocs/with-modal';
import styles from '../../components/hocs/modal.module.css'

const style = `${styles.modal} ${styles.generated}`;
const WithModalGeneratedOrder = withModal(DetailsGeneratedOrder);

const ModalOrderPage: FC = () => {
  return (<WithModalGeneratedOrder style={style} />)
};

export default ModalOrderPage;
