
import { getApiResponse } from '@/Scripts/Services/_common/api';

const defaultIdeaFields = {
  group: '',
  name: '',
  text: ''
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
  return response || undefined
};

const IdeasService = {
  addIdeaService
}
export default IdeasService