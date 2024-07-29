import React, { useEffect, useCallback } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import ModalOverlay from '../modal/components/modal-overlay/modal-overlay';

const modalRoot = document.getElementById("react-modals") as HTMLElement;

type THandleCloseModalCallback = () => void;
type TKeyHandlerCallback = (e: KeyboardEvent) => THandleCloseModalCallback | void;

const withModal = (WrappedComponent: any) => (props: any) => {
  const location = useLocation();
  const background = location.state && location.state.background;
  const navigate = useNavigate();

  const handleCloseModal = useCallback<THandleCloseModalCallback>(() => {
    navigate(-1);
  }, [navigate]);

  const keyHandler = useCallback<TKeyHandlerCallback>((e) => {
    if (e.key === "Escape") {
      handleCloseModal();
    }
  }, [handleCloseModal]);

  useEffect(() => {
    document.addEventListener("keydown", keyHandler)
    return () => {
      document.removeEventListener("keydown", keyHandler)
    }
  }, [keyHandler]);

  return background ?
    createPortal(
      (
        <>
          <aside className={`${props.style}`}>
            <WrappedComponent handleCloseModal={handleCloseModal} {...props} />
          </aside>
          <ModalOverlay handleCloseModal={handleCloseModal} />
        </>
      ),
      modalRoot
    ) :
    <WrappedComponent handleCloseModal={handleCloseModal} />
};

export default withModal;
