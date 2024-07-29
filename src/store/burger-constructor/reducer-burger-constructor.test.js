import { burgerConstructor, initialState } from './reducer';
import * as types from './actions';
import data from "../../utils/data";

describe('burger constructor reducer', () => {
  const extendedData = data.map((elem) => ({...elem, sortId: 'id10', index: 0}));

  it('should return the initial state', () => {
    expect(burgerConstructor(undefined, {})).toEqual(initialState)
  })

  it('replace with sorted stuffing', () => {
    expect(
      burgerConstructor(undefined, {
        type: types.REPLACE_WITH_SORTED_STUFFING,
        payload: extendedData
      })
    ).toEqual({
      bun: null,
      stuffing: extendedData,
    })
  })

  it('set stuffing ingredient', () => {
    expect(
      burgerConstructor(undefined, {
        type: types.SET_STUFFING_INGREDIENT,
        payload: extendedData[0]
      })
    ).toEqual({
      bun: null,
      stuffing: [extendedData[0]],
    })
  })

  it('delete stuffing ingredient', () => {
    expect(
      burgerConstructor(undefined, {
        type: types.DELETE_STUFFING_INGREDIENT,
        payload: extendedData[0]
      })
    ).toEqual({
      bun: null,
      stuffing: [],
    })
  })

  it('set bun', () => {
    expect(
      burgerConstructor(undefined, {
        type: types.SET_BUN,
        payload: data[0]
      })
    ).toEqual({
      bun: data[0],
      stuffing: [],
    })
  })

  it('remove all stuffing', () => {
    expect(
      burgerConstructor(undefined, {
        type: types.REMOVE_ALL_STUFFING,
      })
    ).toEqual({
      bun: null,
      stuffing: [],
    })
  })
})
