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

const getEnergyControlsRecords = async (month) => {
  const fullUrl = month ? `/e-controls-table/${month}` : '/e-controls-table'
  const response = getApiResponse(
      fullUrl,
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

const deleteTableRecord = async (record) => {
  const response = getApiResponse(
      `/e-controls-table/${record._id}`,
      'DELETE',
      null,
      false,
      false,
      true
  );
  return response || undefined;
}

const EnergyControlsService = {
  getEnergyControls,
  getEnergyControlsRecords,
  createTableRecord,
  deleteTableRecord
}

export default EnergyControlsService
