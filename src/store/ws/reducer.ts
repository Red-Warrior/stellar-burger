import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE
} from './actions';
import type { TWSActions } from './types';
import { TOrderData } from '../../types/order';

type TWSState = {
  wsConnected: boolean;
  orders: TOrderData;

  error?: Event;
}

const defaultOrders = {
  success: false,
  orders: [],
  total: 0,
  totalToday: 0
}

const initialState: TWSState = {
  wsConnected: false,
  orders: defaultOrders
};

export const ws = (state = initialState, action: TWSActions) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
        error: undefined
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
        error: action.payload
      };

    case WS_CONNECTION_CLOSED:
      return {
        wsConnected: false,
        orders: defaultOrders,
        error: undefined,
      };

    case WS_GET_MESSAGE:
      return {
        ...state,
        error: undefined,
        orders: action.payload
      };

    default:
      return state;
  }
};
