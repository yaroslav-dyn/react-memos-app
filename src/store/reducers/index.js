import { SET_USER, GET_PROFILE, SET_TOAST, SET_LOADING } from "@/Scripts/Constants/action-types.js";

const initialState = {
  currentUser: null,
  userProfile: null,
  toastData: null,
  loadContent: {loading: false}
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
  else if (action.type === SET_TOAST) {
    return {
      ...state,
      toastData: action.payload
    }
  }
  else if (action.type === SET_LOADING) {
    return {
      ...state,
      loadContent: action.payload
    }
  }
  return state;
};

export default rootReducer;
