import { TOrder } from '../types/order';
import { TOrderStatusSets } from '../types/order';

export const getDoneAndRestsSets = (orders: TOrder[]): TOrderStatusSets => {
  return orders.reduce((acc: TOrderStatusSets, order: TOrder): TOrderStatusSets => {
    if (order.status === "done") {
      acc.done.push(order.number);
    } else {
      acc.pending.push(order.number);
    }
    return acc;
  }, { done: [], pending: [] });
};
