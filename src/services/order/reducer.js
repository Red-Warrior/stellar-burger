import {
  GET_ORDER_INGREDIENTS_REQUEST,
  GET_ORDER_INGREDIENTS_SUCCESS,
  GET_ORDER_INGREDIENTS_FAILED
} from './actions';

const initialState = {
  orderIngredients: [],

  orderIngredientsRequest: false,
  orderIngredientsFailed: false,
};

export const order = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_INGREDIENTS_REQUEST:
      return {
        ...state,
        orderIngredientsRequest: true
      };

    case GET_ORDER_INGREDIENTS_SUCCESS:
      return {
        ...state,
        orderIngredientsRequest: false,
        orderIngredients: action.payload,
        orderIngredientsFailed: false
      };

    case GET_ORDER_INGREDIENTS_FAILED:
      return {
        ...state,
        orderIngredientsFailed: true,
        orderIngredientsRequest: false,
        orderIngredients: []
      };

    default:
      return state;
  }
};
