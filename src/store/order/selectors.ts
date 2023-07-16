import type { RootState } from '../types';

export const getMakeOrderRequestStatus = (store: RootState) => store.order.orderRequest;
export const getStoreSelectedOrder = (store: RootState) => store.order.selectedOrder;
export const getStoreOrder = (store: RootState) => store.order.order.number;

export const isModal = (store: RootState) => store.order.modalIsOpen;
