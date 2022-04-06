import { SET_USER } from "@/scripts/constants/action-types.js";

const initialState = {
  currentUser: null
};

function rootReducer(state = initialState, action) {
  if (action.type === SET_USER) {
    return {
      ...state,
      currentUser: action.payload
    }
  } else return state;
};

export default rootReducer;