export const getRandNumber = (max) => Math.round(Math.random() * max);

export const getRandArray = (arr, count) => Array.from({length: count}).map(_ =>
  arr[getRandNumber(arr.length - 1)]);
