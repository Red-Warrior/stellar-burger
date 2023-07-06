import type { RootState } from '../types';

export const getOrders = (store: RootState) => store.ws.orders;
