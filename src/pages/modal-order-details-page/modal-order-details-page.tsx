import React, { FC } from 'react';
import OrderDetails from '../../components/modal/components/order-details/order-details';
import ModalOrderDetails from '../../components/modal/modal-order-details/modal-order-details';

const ModalOrderDetailsPage: FC = () => {
  return (
    <ModalOrderDetails>
      <OrderDetails />
    </ModalOrderDetails>
  );
};

export default ModalOrderDetailsPage;
