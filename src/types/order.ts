export type TOrder = {
  _id: string;
  ingredients: string[];
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
};

export type TOrderDataResponse = {
  success: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
};

export type TOrderData = Omit<TOrderDataResponse, "success">;

export type TOrderStatuses = "done" | "pending";

export type TOrderStatusSets = {
  [key in TOrderStatuses]: number[];
}

export type TOrderStatus = {
  done: "Выполнен";
  created: "Создан";
  pending: "Готовится";
}

export type TOrderSuccess = {
  name: string;
  number: number;
};
