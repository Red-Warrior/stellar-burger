import React, { useCallback, useEffect, FC, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate, useParams } from 'react-router-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../components/modal-overlay/modal-overlay';
import styles from "./modal-generated-order.module.css";

const modalRoot = document.getElementById("react-modals") as HTMLElement;

type THandleCloseModalCallback = () => void;
type TKeyHandlerCallback = (e: KeyboardEvent) => THandleCloseModalCallback | void;

const ModalGeneratedOrder: FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();

  const { number } = useParams();

  const handleCloseModal = useCallback<THandleCloseModalCallback>(() => {
    navigate(-1);
  }, [navigate]);

  const keyHandler = useCallback<TKeyHandlerCallback>((e) => {
    if (e.key === "Escape") {
      handleCloseModal();
    }
  }, [handleCloseModal])

  useEffect(() => {
    document.addEventListener("keydown", keyHandler)
    return () => {
      document.removeEventListener("keydown", keyHandler)
    }
  }, [keyHandler]);

  return createPortal(
    (
      <>
        <aside className={`${styles.modal} p-10`}>
          <div className={styles.title}>
            <p className="text text_type_digits-default">
              {"#" + number}
            </p>
            <div className={styles.closeIcon}>
              <CloseIcon onClick={handleCloseModal} type="primary" />
            </div>
          </div>

          {children}
        </aside>
        <ModalOverlay handleCloseModal={handleCloseModal} />
      </>
    ),
    modalRoot
  );
};

export default ModalGeneratedOrder;
