import { order, initialState, defaultOrder } from "./reducer";
import * as types from "./actions";

describe('order reducer', () => {
  const testOrder = {
    name: "Био-марсианский люминесцентный краторный бургер",
    number: 10052
  };

  const orders = [{
    _id: "6622f69a97ede0001d066a9b",
    ingredients: [
      "643d69a5c3f7b9001cfa093d",
      "643d69a5c3f7b9001cfa0941"
    ],
    owner: "645ebbf68a4b62001c83727a",
    status: "done",
    name: "Флюоресцентный био-марсианский бургер",
    createdAt: "2024-04-19T22:56:26.514Z",
    updatedAt: "2024-04-19T22:56:27.100Z",
    number: 38400,
    __v: 0
  }];

  it('should return the initial state', () => {
    expect(order(undefined, {})).toEqual(initialState)
  })

  it('post order request', () => {
    expect(
      order(undefined, {
        type: types.POST_ORDER_REQUEST,
      })
    ).toEqual({
      ...initialState,
      orderRequest: true,
    })
  })

  it('post order success', () => {
    expect(
      order(undefined, {
        type: types.POST_ORDER_SUCCESS,
        payload: testOrder
      })
    ).toEqual({
      ...initialState,
      order: testOrder,
    })
  })


  it('post order failed', () => {
    expect(
      order(undefined, {
        type: types.POST_ORDER_FAILED,
      })
    ).toEqual({
      ...initialState,
      orderFailed: true,
    })
  })
  it('remove order', () => {
    expect(
      order(undefined, {
        type: types.REMOVE_ORDER,
      })
    ).toEqual({
      ...initialState,
      order: defaultOrder,
    })
  })
  it('get selected order request', () => {
    expect(
      order(undefined, {
        type: types.GET_SELECTED_ORDER_REQUEST,
      })
    ).toEqual({
      ...initialState,
      selectedOrderRequest: true,
    })
  })
  it('get selected order success', () => {
    expect(
      order(undefined, {
        type: types.GET_SELECTED_ORDER_SUCCESS,
        payload: orders
      })
    ).toEqual({
      ...initialState,
      selectedOrder: orders[0],
    })
  })
  it('get selected order failed', () => {
    expect(
      order(undefined, {
        type: types.GET_SELECTED_ORDER_FAILED,
      })
    ).toEqual({
      ...initialState,
      selectedOrderFailed: true,
    })
  })
  it('open modal', () => {
    expect(
      order(undefined, {
        type: types.OPEN_MODAL,
      })
    ).toEqual({
      ...initialState,
      modalIsOpen: true
    })
  })
  it('close modal', () => {
    expect(
      order(undefined, {
        type: types.CLOSE_MODAL,
      })
    ).toEqual({
      ...initialState,
      modalIsOpen: false
    })
  })
})
