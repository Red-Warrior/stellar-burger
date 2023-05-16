import {
  SET_USER_SUCCESS,
  SET_USER_FAILED,
  UPDATE_USER_SUCCESS,
  RESET_USER_SUCCESS,
  SET_USER_REQUEST,
  SET_USER_REQUEST_STATUS
} from './actions';

const initialState = {
  userName: "",
  userEmail: "",

  userRequest: false,
  userRequestStatus: null,
  userRequestFailed: false,
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_REQUEST:
      return {
        ...state,
        userRequest: true,
      };

    case SET_USER_REQUEST_STATUS:
      return {
        ...state,
        userRequestStatus: action.payload,
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

    case UPDATE_USER_SUCCESS:
      const updatedUser = action.payload;
      return {
        ...state,
        userName: updatedUser.user,
        userEmail: updatedUser.email,
        userRequest: false,
        userRequestFailed: false,
      };

    case RESET_USER_SUCCESS:
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
