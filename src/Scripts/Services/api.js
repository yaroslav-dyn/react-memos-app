import UserService from '@/Scripts/Services/UserService';

const serverUrl = 'https://memo-silver-app.herokuapp.com/';
const localUrl = 'http://localhost:4000/';
const apiUrl =  localUrl //serverUrl || localUrl; //serverUrl
const defaultHeaders = new Headers();
const hasUSer = UserService.getUSerFromStorage();
defaultHeaders.set('Content-Type', 'application/json');

const reqHeaders = new Headers();
reqHeaders.set('Content-Type', 'application/x-www-form-urlencoded');


const responseHandler = (response, clearResponse) => {
  if (!response.ok) {
    console.error(response);
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
    if(hasUSer && isPrivate) {
      defaultHeaders.set('Authorization', `Bearer ${hasUSer}`);
      fullUrl = `${apiUrl}user${currentUrl}`;
    } else fullUrl = `${apiUrl}${currentUrl}`;
    const response = await window.fetch(fullUrl, paramsObj);
    return responseHandler(response, clearResponse);
  } catch (error) {
    new Error(error.statusText);
  }
}




