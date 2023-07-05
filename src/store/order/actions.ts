import { fetchOrder, postOrder } from "../../services/api";
import { TPostOrderPayload } from '../../types/api-payload';
import { AppDispatch, AppThunkAction } from '../types';

export const POST_ORDER_REQUEST: "POST_ORDER_REQUEST" = "POST_ORDER_REQUEST";
export const POST_ORDER_SUCCESS: "POST_ORDER_SUCCESS" = "POST_ORDER_SUCCESS";
export const POST_ORDER_FAILED: "POST_ORDER_FAILED" = "POST_ORDER_FAILED";
export const REMOVE_ORDER: "REMOVE_ORDER" = "REMOVE_ORDER";

export const GET_SELECTED_ORDER_REQUEST: "GET_SELECTED_ORDER_REQUEST" = "GET_SELECTED_ORDER_REQUEST";
export const GET_SELECTED_ORDER_SUCCESS: "GET_SELECTED_ORDER_SUCCESS" = "GET_SELECTED_ORDER_SUCCESS";
export const GET_SELECTED_ORDER_FAILED: "GET_SELECTED_ORDER_FAILED" = "GET_SELECTED_ORDER_FAILED";

export const OPEN_MODAL: "OPEN_MODAL" = "OPEN_MODAL";
export const CLOSE_MODAL: "CLOSE_MODAL" = "CLOSE_MODAL";

export const postNewOrder = (payload: TPostOrderPayload): AppThunkAction => (dispatch: AppDispatch) => {
  dispatch({
    type: POST_ORDER_REQUEST
  });
  postOrder(payload)
    .then(res => {
      if (res.success) {
        const { name, order: { number } } = res;
        dispatch({
          type: POST_ORDER_SUCCESS, payload: { name: name, number: number }

        });
        dispatch({ type: OPEN_MODAL });
      }
    })
    .catch(e => {
      dispatch({
        type: POST_ORDER_FAILED
      });
      console.error(e);
    });
};

export const getSelectedOrder = (payload: string): AppThunkAction => (dispatch: AppDispatch) => {
  dispatch({
    type: GET_SELECTED_ORDER_REQUEST
  });

  fetchOrder(payload)
    .then((res) => {
      dispatch({ type: GET_SELECTED_ORDER_SUCCESS, payload: res.orders });
    })
    .catch(e => {
      dispatch({ type: GET_SELECTED_ORDER_FAILED });
      console.error(e);
    })
};
