import {
  SET_USER_SUCCESS,
  SET_USER_FAILED,
  UPDATE_USER,
  RESET_USER,
  SET_USER_REQUEST,
} from './actions';

const initialState = {
  userName: "",
  userEmail: "",

  userRequest: false,
  userRequestFailed: false,
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_REQUEST:
      return {
        ...state,
        userRequest: true,
      };

    case SET_USER_SUCCESS:
      const user = action.payload;
      return {
        userName: user.name,
        userEmail: user.email,
        userRequest: false,
        userRequestFailed: false,
      };

    case SET_USER_FAILED:
      return {
        userName: "",
        userEmail: "",
        userRequest: false,
        userRequestFailed: true,
      };

    case UPDATE_USER:
      const updatedUser = action.payload;
      return {
        ...state,
        userName: updatedUser.user,
        userEmail: updatedUser.email,
      };

    case RESET_USER:
      return {
        userName: "",
        userEmail: "",
        userRequest: false,
        userRequestFailed: false,
      };

    default:
      return state;
  }
};
