import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
  WS_CONNECTION_START,
} from '../actions';
import { TOrderData } from '../../../types/order';

export type TWSConnectionStart = {
  readonly type: typeof WS_CONNECTION_START;
  readonly payload: string;
};

export type TWSConnectionSuccessAction = {
  readonly type: typeof WS_CONNECTION_SUCCESS;
};

export type TWSConnectionErrorAction = {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload: Event;
};

export type TWSConnectionClosedAction = {
  readonly type: typeof WS_CONNECTION_CLOSED;
};

export type TWSGetMessageAction = {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: TOrderData;
};

export type TWSSendMessageAction = {
  readonly type: typeof WS_SEND_MESSAGE;
  readonly payload: { message: string };
};

export type TWSActions =
  TWSConnectionStart
  | TWSConnectionSuccessAction
  | TWSConnectionErrorAction
  | TWSConnectionClosedAction
  | TWSGetMessageAction
  | TWSSendMessageAction;
