import React, { memo, useEffect } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "./components/modal-overlay/modal-overlay";
import styles from "./modal.module.css";

const modalRoot = document.getElementById("react-modals");

const Modal = memo(({children, title = "", handleCloseModal, extraClass}) => {

  const keyHandler = (e) => {
    if (e.key === "Escape") {
      handleCloseModal();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keyHandler)
    return () => {
      document.removeEventListener("keydown", keyHandler)
    }
    // eslint-disable-next-line
  }, []);

  return createPortal(
    (
      <>
        <aside className={`${styles.modal} ${extraClass} pt-10`}>
          <div className={styles.title}>
            <h2 className="text text_type_main-large">
              {title}
            </h2>
            <div className={styles.closeIcon}>
              <CloseIcon style={{cursor: "pointer"}} onClick={handleCloseModal} type="primary" />
            </div>
          </div>
          {children}
        </aside>
        <ModalOverlay handleCloseModal={handleCloseModal} />
      </>
    ),
    modalRoot
  );
});

export default Modal;

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string,
  handleCloseModal: PropTypes.func.isRequired,
  extraClass: PropTypes.string.isRequired
};
