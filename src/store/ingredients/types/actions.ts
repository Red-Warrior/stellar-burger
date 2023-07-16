import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  FILL_INGREDIENTS_COUNTER,
  RESET_INGREDIENTS_COUNTER,
  INCREASE_INGREDIENTS_COUNT,
  DECREASE_INGREDIENTS_COUNT
} from "../actions";
import { TIngredient } from '../../../types/ingredient';

export type GetIngredients_Request = {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
};

export type GetIngredientsSuccess = {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly payload: TIngredient[];
};

export type GetIngredientsFailed = {
  readonly type: typeof GET_INGREDIENTS_FAILED;
};

export type FillIngredientsCounter = {
  readonly type: typeof FILL_INGREDIENTS_COUNTER;
  readonly payload: TIngredient[];
};

export type ResetIngredientsCounter = {
  readonly type: typeof RESET_INGREDIENTS_COUNTER;
};

export type IncreaseIngredientsCount = {
  readonly type: typeof INCREASE_INGREDIENTS_COUNT;
  readonly payload: string;
};

export type DecreaseIngredientsCount = {
  readonly type: typeof DECREASE_INGREDIENTS_COUNT;
  readonly payload: string;
};

export type TIngredientsActions =
  GetIngredients_Request
  | GetIngredientsSuccess
  | GetIngredientsFailed
  | FillIngredientsCounter
  | ResetIngredientsCounter
  | IncreaseIngredientsCount
  | DecreaseIngredientsCount
