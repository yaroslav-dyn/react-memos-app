import { getApiResponse } from '@/Scripts/Services/_common/api';

const getDEfaultIdeasService = async () => { 
  const response = await getApiResponse('/ideas', 'GET', null, false, false, true);
  return response || undefined;
}

const addIdeaService = async (postData) => {
  const response = await getApiResponse (
    '/idea',
    'POST',
    postData,
    false,
    false,
    true
  );
  return response || undefined;
};

const deleteIdeaService = async (id) => {
  const response = await getApiResponse(
    `/idea/${id}`,
    'DELETE',
    null,
    false,
    false,
    true
  );
  return response || undefined; 
}

const IdeasService = {
  addIdeaService,
  deleteIdeaService,
  getDEfaultIdeasService
}

export default IdeasService