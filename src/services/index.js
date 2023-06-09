import { combineReducers } from 'redux';
import { burgerConstructor } from './burger-constructor/reducer';
import { currentIngredient } from './current-ingredient/reducer';
import { ingredients } from './ingredients/reducer';
import { order } from './order/reducer';
import { user } from "./user/reducer";

export const rootReducer = combineReducers({
  burgerConstructor,
  currentIngredient,
  ingredients,
  order,
  user
});
