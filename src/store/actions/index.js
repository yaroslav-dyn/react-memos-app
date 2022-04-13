import { SET_USER, GET_PROFILE, SET_TOAST, SET_LOADING } from '@/Scripts/Constants/action-types';

export const setUser = payload => ({ type: SET_USER, payload });
export const getProfile = payload => ({ type: GET_PROFILE, payload });
export const setToastData = payload => ({ type: SET_TOAST, payload });
export const setLoadContent = payload => ({ type: SET_LOADING, payload });
