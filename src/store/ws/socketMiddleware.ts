import type { Middleware, MiddlewareAPI } from 'redux';
import type { TWSStoreActions } from './types';
import { TOrderDataResponse } from '../../types/order';
import { AppDispatch, RootState } from '../types';
import { TWSActions } from './types';

export const socketMiddleware = (wsActions: TWSStoreActions): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action: TWSActions) => {
      const { dispatch } = store;
      const { type } = action;
      const { wsInit, onOpen, onClose, onError, onMessage, wsSendMessage } = wsActions;
      if (type === wsInit) {
        socket = new WebSocket(action.payload);

        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData: TOrderDataResponse = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = event => {
          if (event.code !== 1000) {
            dispatch({ type: onError, payload: event });
          }
          dispatch({ type: onClose });
        };
      }

      if (type === wsSendMessage) {
        socket?.send(JSON.stringify(action.payload));
      }

      if (type === onClose) {
        socket?.close();
      }

      next(action);
    };
  }) as Middleware;
};
