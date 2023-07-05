import type { RootState } from '../types';

export const getWsData = (store: RootState) => store.ws;
export const getOrders = (store: RootState) => store.ws.orders;
