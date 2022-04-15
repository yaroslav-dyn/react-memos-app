
// eslint-disable-next-line import/extensions
import UserService from '@/Scripts/Services/_common/userService';
const dev = process.env.NODE_ENV !== 'production';
const serverUrl =  'https://memo-silver-app.herokuapp.com/';
const localUrl = 'http://localhost:4000/';
const apiUrl = !dev ? serverUrl : localUrl ;
const defaultHeaders = new Headers();
import store from '@/store';
import { setLoadContent, setToastData } from "@/store/actions";
defaultHeaders.set('Content-Type', 'application/json');

const reqHeaders = new Headers();
reqHeaders.set('Content-Type', 'application/x-www-form-urlencoded');

const responseHandler = async (response, clearResponse) => {
  if (!response.ok) {
    const parsedRequest = await response.json();
    if (parsedRequest.hasOwnProperty('error') && parsedRequest.error.hasOwnProperty('message'))
      store.dispatch(setToastData({ title: parsedRequest.error.message, type: 'error' }));
  } else return clearResponse ? response : response.json();
};


export const getApiResponse = async (
  currentUrl,
  reqType,
  params,
  clearResponse,
  isSerialize,
  isPrivate) => {
  try {
    let paramsObj = {
      method: reqType,
      headers: defaultHeaders,
      body: null
    };
    if (params && isSerialize) {
      paramsObj = {
        method: reqType,
        headers: reqHeaders,
        body: params
      }
    } else if (params) {
      paramsObj = {
        ...paramsObj,
        body: JSON.stringify(params),
      }
    }
    let fullUrl;
    const hasUser = UserService.getUSerFromStorage();
    if(hasUser && isPrivate) {
      defaultHeaders.set('Authorization', `Bearer ${hasUser}`);
      fullUrl = `${apiUrl}user${currentUrl}`;
    } else fullUrl = `${apiUrl}${currentUrl}`;
    store.dispatch(
      setLoadContent({ loading: true })
    )
    const response = await window.fetch(fullUrl, paramsObj);
    store.dispatch(setLoadContent({ loading: false }))
    return responseHandler(response, clearResponse);
  } catch (error) {
    console.warn('error', error);
    store.dispatch(setLoadContent({ loading: false }))
    store.dispatch(setToastData({ title: `Server error: ${error.message}`, type: 'error'}))   
  }
}




