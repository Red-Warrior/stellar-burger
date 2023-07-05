import React, { useCallback, useEffect, FC, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from "../components/modal-overlay/modal-overlay";
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../store/hooks';
import { REMOVE_ALL_STUFFING } from "../../../store/burger-constructor/actions";
import { RESET_INGREDIENTS_COUNTER } from "../../../store/ingredients/actions";
import { REMOVE_ORDER } from '../../../store/order/actions';
import styles from "./modal-order-details.module.css"

const modalRoot = document.getElementById("react-modals") as HTMLElement;

type THandleCloseModalCallback = () => void;
type TKeyHandlerCallback = (e: KeyboardEvent) => THandleCloseModalCallback | void;

const ModalOrderDetails: FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleCloseModal = useCallback<THandleCloseModalCallback>(() => {
    dispatch({ type: REMOVE_ALL_STUFFING });
    dispatch({ type: RESET_INGREDIENTS_COUNTER });
    dispatch({ type: REMOVE_ORDER });

    navigate(-1);
  }, [navigate, dispatch]);

  const keyHandler = useCallback<TKeyHandlerCallback>((e) => {
    if (e.key === "Escape") {
      handleCloseModal();
    }
  }, [handleCloseModal]);

  useEffect(() => {
    document.addEventListener("keydown", keyHandler);
    return () => {
      document.removeEventListener("keydown", keyHandler);
    }
  }, [keyHandler]);

  return createPortal(
    (
      <>
        <aside className={`${styles.modal} pt-10`}>
          <div className={styles.title}>
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

export default ModalOrderDetails;
