import { SET_USER, GET_PROFILE } from '@/Scripts/Constants/action-types';

export const setUser = payload => ({ type: SET_USER, payload });
export const getProfile = payload => ({ type: GET_PROFILE, payload });
