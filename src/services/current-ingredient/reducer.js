import {
  SET_SELECTED_INGREDIENT,
  DELETE_SELECTED_INGREDIENT,
  OPEN_MODAL,
  CLOSE_MODAL,
  SET_MODAL_TYPE,
  DELETE_MODAL_TYPE
} from './actions';

const initialState = {
  selectedIngredient: null,

  modalType: '',
  modalIsOpen: false,
};

export const currentIngredient = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_INGREDIENT:
      return {
        ...state,
        selectedIngredient: action.payload
      };

    case DELETE_SELECTED_INGREDIENT:
      return {
        ...state,
        selectedIngredient: null
      };

    case OPEN_MODAL:
      return {
        ...state,
        modalIsOpen: true
      };

    case CLOSE_MODAL:
      return {
        ...state,
        modalIsOpen: false
      };

    case SET_MODAL_TYPE:
      return {
        ...state,
        modalType: action.payload
      };

    case DELETE_MODAL_TYPE:
      return {
        ...state,
        modalType: ""
      };

    default:
      return state;
  }
};
