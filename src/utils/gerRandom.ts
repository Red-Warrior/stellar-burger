export const getRandNumber = (max: number) => Math.round(Math.random() * max);

export const getRandArray = (arr: number[], count: number) => Array.from({ length: count }).map(_ =>
  arr[getRandNumber(arr.length - 1)]);
