import { getApiResponse } from '@/Scripts/Services/_common/api';

const getAccounts = async () => {
  const response = getApiResponse(
    '/accounts',
    'GET',
    null,
    false,
    false,
    true
  );
  return response || undefined;
};

const addAccount = async (postData) => {
  const response = getApiResponse(
    '/account',
    'POST',
    postData,
    false,
    false,
    true
  ); 
  return response || undefined;
}

const updateAccounts = (postData, id) => {
  const response = getApiResponse(
    `/account/${id}`,
    'PUT',
    postData,
    false,
    false,
    true
  )
  return response || undefined;
};

const deleteAccounts = (id) => {
  const response = getApiResponse(
    `/account/${id}`,
    'DELETE',
    null,
    false,
    false,
    true
  );
  return response || undefined;
};

const AccountsService = {
  getAccounts,
  addAccount,
  updateAccounts,
  deleteAccounts
}
export default AccountsService