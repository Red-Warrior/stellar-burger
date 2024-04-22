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
} from './actions';
import { TOrderActions } from './types/actions';
import { TOrder, TOrderSuccess } from '../../types/order';

type TDefaultOrder = {
  createdAt: string;
  name: string;
  ingredients: [];
  status: string;
};

type TOrderState = {
  orderRequest: boolean;
  order: TOrderSuccess;
  orderFailed: boolean;

  selectedOrder: TDefaultOrder | TOrder;
  selectedOrderRequest: boolean;
  selectedOrderFailed: boolean;

  modalIsOpen: boolean;
};

export const defaultSelectedOrder: TDefaultOrder = {
  createdAt: "",
  name: "",
  ingredients: [],
  status: ""
};

export const defaultOrder = {
  name: "",
  number: -1,
}

export const initialState: TOrderState = {
  order: defaultOrder,
  orderRequest: false,
  orderFailed: false,

  selectedOrder: defaultSelectedOrder,
  selectedOrderRequest: false,
  selectedOrderFailed: false,

  modalIsOpen: false
};

export const order = (state = initialState, action: TOrderActions): TOrderState => {
  switch (action.type) {
    case POST_ORDER_REQUEST:
      return {
        ...state,
        orderRequest: true,
        orderFailed: false,
      };

    case POST_ORDER_SUCCESS:
      return {
        ...state,
        orderRequest: false,
        order: action.payload,
        orderFailed: false
      };

    case POST_ORDER_FAILED:
      return {
        ...state,
        orderRequest: false,
        order: defaultOrder,
        orderFailed: true,
      };

    case REMOVE_ORDER:
      return {
        ...state,
        order: defaultOrder,
      };

    case  GET_SELECTED_ORDER_REQUEST:
      return {
        ...state,
        selectedOrder: defaultSelectedOrder,
        selectedOrderRequest: true,
        selectedOrderFailed: false,
      };

    case GET_SELECTED_ORDER_SUCCESS:
      return {
        ...state,
        selectedOrder: action.payload[0],
        selectedOrderRequest: false,
        selectedOrderFailed: false,
      };

    case GET_SELECTED_ORDER_FAILED:
      return {
        ...state,
        selectedOrderRequest: false,
        selectedOrderFailed: true,
      };

    case OPEN_MODAL: {
      return {
        ...state,
        modalIsOpen: true
      }
    }
    case CLOSE_MODAL: {
      return {
        ...state,
        modalIsOpen: false
      }
    }

    default:
      return state;
  }
};
