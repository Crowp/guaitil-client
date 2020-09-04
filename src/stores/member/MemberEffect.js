import environment from 'environment';
import * as EffectUtility from '../../utils/EffectUtility';
import HttpResponseModel from '../../models/HttpErrorResponseModel';
import MemberModel from '../../models/MemberModel';
import { isIterableArray } from '../../template/helpers/utils';
import * as MultimediaEffect from '../multimedia/MultimediaEffect';
import * as UserEffect from '../user/UserEffect';

export const requestMembers = async () => {
  const endpoint = environment.api.members.replace(':id', '');
  return await EffectUtility.getToModel(MemberModel, endpoint);
};

export const requestUpdateMember = async member => {
  const endpoint = environment.api.members.replace(':id', member.id);
  return await EffectUtility.putToModel(MemberModel, endpoint, member);
};

export const requestCreateMember = async member => {
  const endpoint = environment.api.members.replace(':id', '');
  return await EffectUtility.postToModel(MemberModel, endpoint, member);
};
export const requestMemberById = async id => {
  const endpoint = environment.api.members.replace(':id', id);
  return await EffectUtility.getToModel(MemberModel, endpoint);
};

export const requestDeleteMember = async id => {
  const endpoint = environment.api.members.replace(':id', id);
  const response = await EffectUtility.deleteToModel(MemberModel, endpoint);
  return response instanceof HttpResponseModel ? response : id;
};

export const requestCreateMemberWithUserWithLocal = async (member, local, user) => {
  const endpoint = environment.api.members.replace(':id', '');
  let responseMultimediaList = await MultimediaEffect.requestCreateMultimediaList(local.multimedia, 'local_', '_image');
  if (responseMultimediaList instanceof HttpResponseModel) {
    return responseMultimediaList;
  }
  local.multimedia = [...responseMultimediaList];
  member.locals = [local];

  const responseMember = await EffectUtility.postToModel(MemberModel, endpoint, member);

  if (responseMember instanceof HttpResponseModel) {
    if (isIterableArray(responseMultimediaList)) {
      await MultimediaEffect.requestDeleteMultimediaList(responseMultimediaList);
    }
    return responseMember;
  }
  const newUser = {
    ...user,
    member: responseMember
  };
  const responseUser = await UserEffect.requestCreateUser(newUser);
  if (responseUser instanceof HttpResponseModel) {
    if (responseMember?.id) {
      await requestDeleteMember(responseMember.id);
    }
    return responseUser;
  }

  return responseMember;
};
