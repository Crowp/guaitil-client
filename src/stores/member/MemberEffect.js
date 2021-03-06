import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import { createMemberPostRequest } from './requests/MemberPostRequest';
import { createMemberLocalFilesUserPostRequest } from './requests/MemberLocalFilesUserPostRequest';
import { createMemberDeleteRequest } from './requests/MemberDeleteRequest';
import { createMembersRequest } from './requests/MembersRequest';
import { createMemberPutRequest } from './requests/MemberPutRequest';

export const requestMembers = async () => {
  return await createMembersRequest().getResponse();
};

export const requestMembersWithoutUser = async () => {
  return await createMembersRequest('members-without-users').getResponse();
};

export const requestMemberById = async id => {
  return await createMembersRequest(id).getResponse();
};

export const requestDeleteMember = async id => {
  const response = await createMemberDeleteRequest(id).getResponse();
  return response instanceof HttpErrorResponseModel ? response : id;
};

export const requestCreateMember = async member => {
  return await createMemberPostRequest(member).getResponse();
};

export const requestCreateMemberWithUserWithLocal = async (member, local, user) => {
  return await createMemberLocalFilesUserPostRequest(member, local, user).getResponse();
};

export const requestUpdateMember = async member => {
  return await createMemberPutRequest(member).getResponse();
};
