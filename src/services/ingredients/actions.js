import { getIngredientsRequest } from "../../utils/api";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export const FILL_INGREDIENTS_COUNTER = "FILL_INGREDIENTS_COUNTER";
export const RESET_INGREDIENTS_COUNTER = "CLEAR_INGREDIENTS_COUNTER";

export const INCREASE_INGREDIENTS_COUNT = "INCREASE_INGREDIENTS_COUNT";
export const DECREASE_INGREDIENTS_COUNT = "DECREASE_INGREDIENTS_COUNT";

export const getIngredients = () => (dispatch) => {
  dispatch({
    type: GET_INGREDIENTS_REQUEST
  });

  getIngredientsRequest(`${process.env.REACT_APP_BURGER_API_URL}/ingredients`)
    .then(res => {
      dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        payload: res.data
      })
      dispatch({
        type: FILL_INGREDIENTS_COUNTER,
        payload: res.data
      })
    })
    .catch(e => {
      dispatch({
        type: GET_INGREDIENTS_FAILED
      })
      console.log(e);
    });
}
