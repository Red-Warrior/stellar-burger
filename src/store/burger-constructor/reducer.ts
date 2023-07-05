import {
  SET_STUFFING_INGREDIENT,
  DELETE_STUFFING_INGREDIENT,
  SET_BUN,
  REMOVE_ALL_STUFFING,
  REPLACE_WITH_SORTED_STUFFING,
} from './actions';
import { TBurgerConstructorActions } from './types/actions';
import { TAddedIngredient, TIngredient } from '../../types/ingredient';

type TBurgerConstructorState = {
  bun: TIngredient | null,
  stuffing: TAddedIngredient[],
};

const initialState: TBurgerConstructorState = {
  bun: null,
  stuffing: [],
};

export const burgerConstructor = (
  state = initialState,
  action: TBurgerConstructorActions
): TBurgerConstructorState => {
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
        stuffing: state.stuffing.filter((item: TAddedIngredient) => item.sortId !== action.payload)
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

    default:
      return state;
  }
};
