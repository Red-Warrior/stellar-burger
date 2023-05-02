import checkResponse from "./checkResponse";

export const getIngredientsRequest = (url) => {
  return fetch(url).then((res) => checkResponse(res));
};

export const postOrder = (url, payload) => {
  return fetch(url, payload).then((res) => checkResponse(res));
};
