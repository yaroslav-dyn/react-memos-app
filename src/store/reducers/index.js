import { SET_USER } from "@/scripts/constants/action-types";

const initialState = {
    currentUser: null
};

function rootReducer(state = initialState, action) {
    if (action.type === SET_USER) {
        state.currentUser = action.payload;
    }
    return state;
};

export default rootReducer;