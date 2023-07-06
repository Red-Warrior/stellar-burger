import React, { FC } from 'react';
import ModalGeneratedOrder from '../../components/modal/modal-generated-order/modal-generated-order';
import DetailsGeneratedOrder from '../../components/modal/components/generated-order/generated-order';

const ModalOrderPage: FC = () => {
  return (
    <ModalGeneratedOrder>
      <DetailsGeneratedOrder />
    </ModalGeneratedOrder>
  )
};

export default ModalOrderPage;
