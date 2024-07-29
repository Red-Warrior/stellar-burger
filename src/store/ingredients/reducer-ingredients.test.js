import { ingredients, initialState } from "./reducer";
import * as types from './actions';
import data from "../../utils/data";

describe('ingredients reducer', () => {
  const dataFillCounter = data.reduce((acc, item) => {
    acc[item._id] = {...item, count: 0};
    return acc;
  }, {});

  const dataCounterResetToZero =
    Object.fromEntries(Object.entries(dataFillCounter).map(elem => {
      if (elem[0] === 'count') {
        return ['count', 0];
      }
      return elem;
    }));

  const testId = "60666c42cc7b410027a1a9b5";
  const counterIncreased = {
    ...dataFillCounter,
    [testId]: {...dataFillCounter[testId], count: dataFillCounter[testId].count + 1}
  };
  const counterDecreased = {
    ...dataFillCounter,
    [testId]: {...dataFillCounter[testId], count: dataFillCounter[testId].count - 1 >= 0 || 0}
  };

  it('should return the initial state', () => {
    expect(ingredients(undefined, {})).toEqual(initialState)
  })

  it('get ingredients request', () => {
    expect(
      ingredients(undefined, {
        type: types.GET_INGREDIENTS_REQUEST,
      })
    ).toEqual({
      ...initialState,
      ingredientsRequest: true,
    })
  })

  it('get ingredients success', () => {
    expect(
      ingredients(undefined, {
        type: types.GET_INGREDIENTS_SUCCESS,
        payload: data
      })
    ).toEqual({
      ...initialState,
      ingredients: data,
    })
  })

  it('get ingredients failed', () => {
    expect(
      ingredients(undefined, {
        type: types.GET_INGREDIENTS_FAILED,
      })
    ).toEqual({
      ...initialState,
      ingredientsFailed: true,
    })
  })

  it('fill ingredients counter', () => {
    expect(
      ingredients(undefined, {
        type: types.FILL_INGREDIENTS_COUNTER,
        payload: data
      })
    ).toEqual({
      ...initialState,
      ingredientsDataAndCount: dataFillCounter,
    })
  })

  it('reset ingredients counter', () => {
    expect(
      ingredients({
        ...initialState,
        ingredientsDataAndCount: dataFillCounter
      }, {
        type: types.RESET_INGREDIENTS_COUNTER,
      })
    ).toEqual({
      ...initialState,
      ingredientsDataAndCount: dataCounterResetToZero,
    })
  })

  it('increase ingredients count', () => {
    expect(
      ingredients({
        ...initialState,
        ingredientsDataAndCount: dataFillCounter
      }, {
        type: types.INCREASE_INGREDIENTS_COUNT,
        payload: testId
      })
    ).toEqual({
      ...initialState,
      ingredientsDataAndCount: counterIncreased,
    })
  })

  it('decrease ingredients count', () => {
    expect(
      ingredients({
        ...initialState,
        ingredientsDataAndCount: dataFillCounter
      }, {
        type: types.DECREASE_INGREDIENTS_COUNT,
        payload: testId
      })
    ).toEqual({
      ...initialState,
      ingredientsDataAndCount: counterDecreased,
    })
  })
})
