import type { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { store } from './store';
import { TBurgerConstructorActions } from './burger-constructor/types/actions';
import { TIngredientsActions } from './ingredients/types/actions';
import { TOrderActions } from './order/types/actions';
import { TUserActions } from './user/types/actions';
import { TWSActions } from './ws/types/index';

export type AppActions =
  TBurgerConstructorActions
  | TIngredientsActions
  | TOrderActions
  | TUserActions
  | TWSActions;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActions>;
export type AppThunkAction<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppActions>;
