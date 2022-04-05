import { SET_USER } from "@/scripts/constants/action-types";

export const setUser = (payload) => {
    return { type: SET_USER, payload };
};
