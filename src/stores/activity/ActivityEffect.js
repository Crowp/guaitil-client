import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import { createActivityFilesPostRequest } from './requests/ActivityFilesPostRequest';
import { createActivitiesRequest } from './requests/ActivitiesRequest';
import { createActivityDeleteRequest } from './requests/ActivityDeleteRequest';
import { createActivityDeleteFilesByIdRequest } from './requests/ActivityDeleteFilesByIdRequest';
import { createActivityFilesPutRequest } from './requests/ActivityPutRequest';
import { createActivitiesRequestReport } from './requests/ActivityRequestReport';

export const requestActivities = async () => {
  return await createActivitiesRequest().getResponse();
};

export const requestActivityById = async id => {
  return await createActivitiesRequest(id).getResponse();
};
export const requestActivitiesReportPdf = async () => {
  return await createActivitiesRequestReport('pdf-report', 'pdf').getResponse();
};

export const requestActivitiesReportExcel = async () => {
  return await createActivitiesRequestReport('xlsx-report', 'xlsx').getResponse();
};

export const requestUpdateActivity = async activity => {
  return await createActivityFilesPutRequest(activity).getResponse();
};

export const requestDeleteActivity = async id => {
  const response = await createActivityDeleteRequest(id).getResponse();
  return response instanceof HttpErrorResponseModel ? response : id;
};

export const requestDeleteActivityMultimediaById = async (id, idMultimedia) => {
  return await createActivityDeleteFilesByIdRequest(id, idMultimedia).getResponse();
};

export const requestCreateActivity = async activity => {
  return await createActivityFilesPostRequest(activity).getResponse();
};
