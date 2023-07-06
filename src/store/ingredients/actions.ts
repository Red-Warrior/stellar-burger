import { getIngredientsRequest } from '../../services/api';
import { AppDispatch, AppThunkAction } from '../types';

export const GET_INGREDIENTS_REQUEST: "GET_INGREDIENTS_REQUEST" = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS: "GET_INGREDIENTS_SUCCESS" = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED: "GET_INGREDIENTS_FAILED" = "GET_INGREDIENTS_FAILED";

export const FILL_INGREDIENTS_COUNTER: "FILL_INGREDIENTS_COUNTER" = "FILL_INGREDIENTS_COUNTER";
export const RESET_INGREDIENTS_COUNTER: "RESET_INGREDIENTS_COUNTER" = "RESET_INGREDIENTS_COUNTER";

export const INCREASE_INGREDIENTS_COUNT: "INCREASE_INGREDIENTS_COUNT" = "INCREASE_INGREDIENTS_COUNT";
export const DECREASE_INGREDIENTS_COUNT: "DECREASE_INGREDIENTS_COUNT" = "DECREASE_INGREDIENTS_COUNT";

export const getIngredients = (): AppThunkAction => (dispatch: AppDispatch) => {
  dispatch({
    type: GET_INGREDIENTS_REQUEST
  });

  getIngredientsRequest()
    .then(res => {
      dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        payload: res.data
      });
      dispatch({
        type: FILL_INGREDIENTS_COUNTER,
        payload: res.data
      });
    })
    .catch(e => {
      dispatch({
        type: GET_INGREDIENTS_FAILED
      });
      console.error(e);
    });
}
