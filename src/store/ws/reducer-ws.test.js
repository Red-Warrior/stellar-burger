import { ws, initialState } from "./reducer";
import * as types from './actions';
import { defaultOrders } from "./reducer";
import data from "../../utils/data";

describe('burger constructor reducer', () => {

  it('should return the initial state', () => {
    expect(ws(undefined, {})).toEqual(initialState)
  })

  it('ws connection success ', () => {
    expect(
      ws(undefined, {
        type: types.WS_CONNECTION_SUCCESS,
      })
    ).toEqual({
      orders: defaultOrders,
      error: undefined
    })
  })

  it('ws connection error', () => {
    expect(
      ws(undefined, {
        type: types.WS_CONNECTION_ERROR,
        payload: 'message'
      })
    ).toEqual({
      orders: defaultOrders,
      error: 'message'
    })
  })

  it('ws connection closed ', () => {
    expect(
      ws(undefined, {
        type: types.WS_CONNECTION_CLOSED,
      })
    ).toEqual({
      orders: defaultOrders,
      error: undefined,
    })
  })

  it('ws get message', () => {
    expect(
      ws(undefined, {
        type: types.WS_GET_MESSAGE,
        payload: data
      })
    ).toEqual({
      error: undefined,
      orders: data
    })
  })
})
