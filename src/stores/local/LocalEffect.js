import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import { createLocalFilesPostRequest } from './requests/LocalFilesPostRequest';
import { createLocalFilesUserPostRequest } from './requests/LocalFilesUserPostRequest';
import { createLocalsRequest } from './requests/LocalsRequest';
import { createLocalDeleteRequest } from './requests/LocalDeleteRequest';
import { createLocalDeleteFilesbyIdRequest } from './requests/LocalDeleteFilesbyIdRequest';
import { createLocalFilesUserPasswordPutRequest } from './requests/LocalFilesPasswordPutRequest';
import { createLocalsRequestReport } from './requests/LocalsRequestReport';

export const requestLocals = async () => {
  return await createLocalsRequest().getResponse();
};

export const requestResetLocalPassword = async id => {
  return await createLocalsRequest(`reset-with-generic-password/${id}`).getResponse();
};

export const requestLocalsByLocalType = async type => {
  return await createLocalsRequest(`local-types/${type}`).getResponse();
};

export const requestOnShowLocal = async id => {
  return await createLocalsRequest(`show-local/${id}`).getResponse();
};

export const requestLocalById = async id => {
  return await createLocalsRequest(id).getResponse();
};
export const requestLocalsReportPdf = async () => {
  return await createLocalsRequestReport('pdf-report', 'pdf').getResponse();
};

export const requestLocalsReportExcel = async () => {
  return await createLocalsRequestReport('xlsx-report', 'xlsx').getResponse();
};

export const requestLocalsByMemberId = async memberId => {
  return await createLocalsRequest(`member-id/${memberId}`).getResponse();
};

export const requestCreateLocal = async local => {
  return createLocalFilesPostRequest(local).getResponse();
};

export const requestCreateLocalWithUser = async (local, user) => {
  return createLocalFilesUserPostRequest(local, user).getResponse();
};

export const requestDeleteLocal = async id => {
  const response = await createLocalDeleteRequest(id).getResponse();
  return response instanceof HttpErrorResponseModel ? response : id;
};

export const requestDeleteLocalMultimediaById = async (localId, idMultimedia) => {
  return await createLocalDeleteFilesbyIdRequest(localId, idMultimedia).getResponse();
};

export const requestUpdateLocal = async (local, user) => {
  return await createLocalFilesUserPasswordPutRequest(local, user).getResponse();
};
