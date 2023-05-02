import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  FILL_INGREDIENTS_COUNTER,
  RESET_INGREDIENTS_COUNTER,
  INCREASE_INGREDIENTS_COUNT,
  DECREASE_INGREDIENTS_COUNT
} from './actions';

const initialState = {
  ingredients: [],
  ingredientsCounter: null,

  ingredientsRequest: false,
  ingredientsFailed: false,
};

export const ingredients = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST:
      return {
        ...state,
        ingredientsRequest: true
      };

    case GET_INGREDIENTS_SUCCESS:
      return {
        ingredientsRequest: false,
        ingredients: action.payload,
        ingredientsFailed: false
      };

    case GET_INGREDIENTS_FAILED:
      return {
        ingredientsFailed: true,
        ingredientsRequest: false,
        ingredients: []
      };

    case FILL_INGREDIENTS_COUNTER:
      return {
        ...state,
        ingredientsCounter: action.payload.reduce((acc, item) => {
          acc[item.name] = 0;
          return acc;
        }, {})
      };

    case RESET_INGREDIENTS_COUNTER:
      const resetIngredientsCounter = {...state.ingredientsCounter};
      for (const key in resetIngredientsCounter) {
        resetIngredientsCounter[key] = 0;
      }

      return {
        ...state,
        resetIngredientsCounter
      };

    case INCREASE_INGREDIENTS_COUNT:
      return {
        ...state,
        ingredientsCounter: {
          ...state.ingredientsCounter,
          [action.payload]: state.ingredientsCounter[action.payload] + 1
        }
      };

    case DECREASE_INGREDIENTS_COUNT:
      return {
        ...state,
        ingredientsCounter: {
          ...state.ingredientsCounter,
          [action.payload]: state[action.payload] > 0 ? -1 : 0
        }
      };

    default:
      return state;
  }
};
