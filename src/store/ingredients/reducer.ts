import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  FILL_INGREDIENTS_COUNTER,
  RESET_INGREDIENTS_COUNTER,
  INCREASE_INGREDIENTS_COUNT,
  DECREASE_INGREDIENTS_COUNT,
} from './actions';
import { TIngredientsActions } from './types/actions';
import { TIngredient, TIngredientWithCount } from '../../types/ingredient';

type TIngredientField = {
  [key: string]: TIngredientWithCount;
};

type TIngredientById = {
  [key: string]: TIngredientWithCount;
};

type TIngredientsStore = {
  ingredients: TIngredient[];
  ingredientsDataAndCount: TIngredientById | null;
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
};

export const initialState: TIngredientsStore = {
  ingredients: [],
  ingredientsDataAndCount: null,

  ingredientsRequest: false,
  ingredientsFailed: false,
};

export const ingredients = (state = initialState, action: TIngredientsActions): TIngredientsStore => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST:
      return {
        ...state,
        ingredientsRequest: true
      };

    case GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        ingredientsRequest: false,
        ingredients: action.payload,
        ingredientsFailed: false
      };

    case GET_INGREDIENTS_FAILED:
      return {
        ...state,
        ingredientsFailed: true,
        ingredientsRequest: false,
        ingredients: []
      };

    case FILL_INGREDIENTS_COUNTER:
      return {
        ...state,
        ingredientsDataAndCount: action.payload.reduce((acc: TIngredientField, item: TIngredient) => {
          acc[item._id] = { ...item, count: 0 };
          return acc;
        }, {})
      };

    case RESET_INGREDIENTS_COUNTER:
      const resetIngredientsCounter = { ...state.ingredientsDataAndCount };
      for (const key in resetIngredientsCounter) {
        resetIngredientsCounter[key].count = 0;
      }
      return {
        ...state,
        ingredientsDataAndCount: resetIngredientsCounter
      };

    case INCREASE_INGREDIENTS_COUNT:
      if (!state.ingredientsDataAndCount) return state;

      const ingredientIncreased = state.ingredientsDataAndCount[action.payload]
      return {
        ...state,
        ingredientsDataAndCount: {
          ...state.ingredientsDataAndCount,
          [action.payload]: { ...ingredientIncreased, count: ingredientIncreased.count + 1 }
        }
      };

    case DECREASE_INGREDIENTS_COUNT:
      if (!state.ingredientsDataAndCount) return state;

      const ingredientDecreased = state.ingredientsDataAndCount[action.payload]
      if (ingredientDecreased.count === 0) return state;

      return {
        ...state,
        ingredientsDataAndCount: {
          ...state.ingredientsDataAndCount,
          [action.payload]: { ...ingredientDecreased, count: ingredientDecreased.count - 1 }
        }
      };

    default:
      return state;
  }
};
