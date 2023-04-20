import checkResponse from "./checkResponse";

export const getIngredients = (url) => {
  return fetch(url).then((res) => checkResponse(res));
};
