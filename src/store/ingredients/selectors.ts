import type { RootState } from '../types';

export const getStoreIngredients = (store: RootState) => store.ingredients;
export const getIngredientsDataAndCount = (store: RootState) => store.ingredients.ingredientsDataAndCount;
