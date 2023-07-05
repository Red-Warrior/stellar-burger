import {
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  POST_ORDER_FAILED,
  REMOVE_ORDER,
  GET_SELECTED_ORDER_REQUEST,
  GET_SELECTED_ORDER_SUCCESS,
  GET_SELECTED_ORDER_FAILED,
  OPEN_MODAL,
  CLOSE_MODAL
} from "../actions";
import { TOrder, TOrderSuccess } from '../../../types/order';

export type TPostOrderRequest = {
  readonly type: typeof POST_ORDER_REQUEST;
};

export type TPostOrderSuccess = {
  readonly type: typeof POST_ORDER_SUCCESS;
  readonly payload: TOrderSuccess;
};

export type TPostOrderFailed = {
  readonly type: typeof POST_ORDER_FAILED;
};

export type TRemoveOrder = {
  readonly type: typeof REMOVE_ORDER;
};

export type TGetSelectedOrderRequest = {
  readonly type: typeof GET_SELECTED_ORDER_REQUEST;
};

export type TGetSelectedOrderSuccess = {
  readonly type: typeof GET_SELECTED_ORDER_SUCCESS;
  readonly payload: TOrder[];
};

export type TGetSelectedOrderFailed = {
  readonly type: typeof GET_SELECTED_ORDER_FAILED;
};

export type TOpenModal = {
  readonly type: typeof OPEN_MODAL;
};

export type TCloseModal = {
  readonly type: typeof CLOSE_MODAL;
};

export type TOrderActions =
  TPostOrderRequest
  | TPostOrderSuccess
  | TPostOrderFailed
  | TRemoveOrder
  | TGetSelectedOrderRequest
  | TGetSelectedOrderSuccess
  | TGetSelectedOrderFailed
  | TOpenModal
  | TCloseModal
