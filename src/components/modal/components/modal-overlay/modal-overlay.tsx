import React, { memo, FC } from 'react';
import styles from './modal-overlay.module.css';

type TModalOverlayProps = {
  handleCloseModal: () => void;
};

const ModalOverlay: FC<TModalOverlayProps> = memo(({ handleCloseModal }) => {
  return (
    <div className={styles.overlay} onClick={handleCloseModal} />
  );
});

export default ModalOverlay;
