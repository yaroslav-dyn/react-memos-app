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

const getEnergyControlsRecords = async () => {
  const response = getApiResponse(
      '/e-controls-table',
      'GET',
      null,
      false,
      false,
      true
  );
  return response || undefined;
}

const createTableRecord = async (record) => {
  const response = getApiResponse(
      '/e-controls-table',
      'POST',
      record,
      false,
      false,
      true
  );
  return response || undefined;
}

const EnergyControlsService = {
  getEnergyControls,
  getEnergyControlsRecords,
  createTableRecord
}

export default EnergyControlsService
