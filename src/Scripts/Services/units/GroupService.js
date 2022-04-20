import { getApiResponse } from '@/Scripts/Services/_common/api';

/**
 * Add Groups
 * @param {Object} postData 
 * @returns {Object | undefined}
 */
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

/**
 * Updates Group
 * @param {+} postData 
 * @param {string} id 
 * @returns {Object | undefined}
 */
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

/**
 * Delete Group
 * @param {string} id 
 * @returns {Object | undefined}
 */
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