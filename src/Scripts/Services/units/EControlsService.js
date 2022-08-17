import { getApiResponse } from '@/Scripts/Services/_common/api';


const getEnergyControls = async () => {
  const response = getApiResponse(
      '/e-controls',
      'GET',
      null,
      false,
      false,
      true
  );
  return response || undefined;
}


const EnergyControlsService = {
  getEnergyControls
}

export default EnergyControlsService
