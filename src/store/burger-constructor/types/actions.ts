import {
  SET_STUFFING_INGREDIENT,
  DELETE_STUFFING_INGREDIENT,
  SET_BUN,
  REPLACE_WITH_SORTED_STUFFING,
  REMOVE_ALL_STUFFING,
} from "../actions"
import { TAddedIngredient, TIngredient } from '../../../types/ingredient';

export type TSetStuffingIngredient = {
  readonly type: typeof SET_STUFFING_INGREDIENT;
  readonly payload: TAddedIngredient;
};

export type TDeleteStuffingIngredient = {
  readonly type: typeof DELETE_STUFFING_INGREDIENT;
  readonly payload: string;
};

export type TSetBun = {
  readonly type: typeof SET_BUN;
  readonly payload: TIngredient;
};

export type TReplaceWithSortedStuffing = {
  readonly type: typeof REPLACE_WITH_SORTED_STUFFING;
  readonly payload: TAddedIngredient[];
};

export type TRemoveAllStuffing = {
  readonly type: typeof REMOVE_ALL_STUFFING;
};

export type TBurgerConstructorActions =
  TSetStuffingIngredient
  | TDeleteStuffingIngredient
  | TSetBun
  | TReplaceWithSortedStuffing
  | TRemoveAllStuffing
