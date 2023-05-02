import {
  SET_STUFFING_INGREDIENT,
  DELETE_STUFFING_INGREDIENT,
  SET_BUN,
  REMOVE_ALL_STUFFING,
  SET_TOTAL_PRICE,
  SET_ORDER_NUMBER,
  DELETE_ORDER_NUMBER,
  REPLACE_WITH_SORTED_STUFFING,
} from './actions';

const initialState = {
  bun: null,
  stuffing: [],

  totalPrice: 0,
  orderNumber: 0
};

export const burgerConstructor = (state = initialState, action) => {
  switch (action.type) {
    case REPLACE_WITH_SORTED_STUFFING:
      return {
        ...state,
        stuffing: action.payload
      };

    case SET_STUFFING_INGREDIENT:
      return {
        ...state,
        stuffing: [...state.stuffing, action.payload]
      };

    case DELETE_STUFFING_INGREDIENT:
      return {
        ...state,
        stuffing: state.stuffing.filter(item => item._id !== action.payload)
      };

    case SET_BUN:
      return {
        ...state,
        bun: action.payload
      };

    case REMOVE_ALL_STUFFING:
      return {
        ...state,
        bun: null,
        stuffing: []
      };

    case SET_TOTAL_PRICE:
      const {bun, stuffing} = action.payload;
      if (!bun && !stuffing.length) {
        return {
          ...state,
          totalPrice: 0
        };
      }

      let totalPrice = stuffing.reduce((acc, item) => acc + item?.price, 0);
      if (bun) {
        totalPrice += bun.price * 2;
      }
      return {
        ...state,
        totalPrice
      };

    case SET_ORDER_NUMBER:
      return {
        ...state,
        orderNumber: action.payload
      };

    case DELETE_ORDER_NUMBER:
      return {
        ...state,
        orderNumber: 0
      };

    default:
      return state;
  }
};
