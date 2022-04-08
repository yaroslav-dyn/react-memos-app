import { SET_USER, GET_PROFILE, SET_TOAST } from '@/Scripts/Constants/action-types';

export const setUser = payload => ({ type: SET_USER, payload });
export const getProfile = payload => ({ type: GET_PROFILE, payload });
export const setToastData = payload => ({ type: SET_TOAST, payload });
