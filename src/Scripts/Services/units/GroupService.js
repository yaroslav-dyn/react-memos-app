import { getApiResponse } from '@/Scripts/Services/_common/api';

const addGroups = async (postData) => {
  const response = await getApiResponse(
    '/group',
    'POST',
    postData,
    false,
    false,
    true
  );
  return response || undefined;
};

const updateGroups = async (postData, id) => {
  const response = await getApiResponse(
    `/group/${id}`,
    'PUT',
    postData,
    false,
    false,
    true
  );
  return response || undefined;
};

const deleteGroups = async (id) => {
  const response = await getApiResponse(
    `/group/${id}`,
    'DELETE',
    null,
    false,
    false,
    true
  );
  return response || undefined;
}

const GroupsService = {
  addGroups,
  updateGroups,
  deleteGroups
}
export default GroupsService