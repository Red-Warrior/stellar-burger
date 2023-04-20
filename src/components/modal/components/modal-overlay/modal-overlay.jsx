import React, { memo } from 'react';
import styles from './modal-overlay.module.css';
import PropTypes from "prop-types";

const ModalOverlay = memo(({handleCloseModal}) => {
  return (
    <div className={styles.overlay} onClick={handleCloseModal} />
  );
});

export default ModalOverlay;

ModalOverlay.propTypes = {
  handleCloseModal: PropTypes.func.isRequired
};
