import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { burgerConstructor } from './burger-constructor/reducer';
import { ingredients } from './ingredients/reducer';
import { order } from './order/reducer';
import { user } from "./user/reducer";
import { ws } from "./ws/reducer";
import { socketMiddleware } from './ws/socketMiddleware';

import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE
} from './ws/actions';
import type { TWSStoreActions } from './ws/types';

const wsActions: TWSStoreActions = {
  wsInit: WS_CONNECTION_START,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE
};

export const rootReducer = combineReducers({
  burgerConstructor,
  ingredients,
  order,
  user,
  ws
});

const enhancer = composeWithDevTools(applyMiddleware(thunk, socketMiddleware(wsActions)));
export const store = createStore(rootReducer, enhancer);
