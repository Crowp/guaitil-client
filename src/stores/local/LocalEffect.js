import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import { createLocalFilesPostRequest } from './requests/LocalFilesPostRequest';
import { createLocalFilesUserPostRequest } from './requests/LocalFilesUserPostRequest';
import { createLocalsRequest } from './requests/LocalsRequest';
import { createLocalDeleteRequest } from './requests/LocalDeleteRequest';
import { createLocalDeleteFilesbyIdRequest } from './requests/LocalDeleteFilesbyIdRequest';
import { createLocalFilesUserPasswordPutstRequest } from './requests/LocalFilesPasswordPutRequest';

export const requestLocals = async () => {
  return await createLocalsRequest().getResponse();
};

export const requestLocalsByLocalType = async type => {
  return await createLocalsRequest(`local-types/${type}`).getResponse();
};

export const requestLocalById = async id => {
  return await createLocalsRequest(id).getResponse();
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
  return await createLocalFilesUserPasswordPutstRequest(local, user).getResponse();
};
