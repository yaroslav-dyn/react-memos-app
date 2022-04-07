import { SET_USER, GET_PROFILE } from "@/Scripts/Constants/action-types.js";

const initialState = {
  currentUser: null,
  userProfile: null
};

function rootReducer(state = initialState, action) {
  if (action.type === SET_USER) {
    return {
      ...state,
      currentUser: action.payload
    }
  } else if (action.type === GET_PROFILE) {
    return {
      ...state,
      userProfile: action.payload
    }
  }
  return state;
};

export default rootReducer;
