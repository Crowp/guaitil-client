import ActionUtility from '../../utils/ActionUtility';
import * as MemberEffect from './MemberEffect';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import ToastsAction from '../toasts/ToastsAction';
import { ToastStatusEnum } from '../../constants';

export default class MemberAction {
  static REQUEST_MEMBER = 'MemberAction.REQUEST_MEMBER';
  static REQUEST_MEMBER_FINISHED = 'MemberAction.REQUEST_MEMBER_FINISHED';

  static getMembers() {
    return async (dispatch, getState) => {
      await ActionUtility.createThunkEffect(dispatch, MemberAction.REQUEST_MEMBER, MemberEffect.requestMembers);
    };
  }

  static REQUEST_MEMBER_UPDATE = 'MemberAction.REQUEST_MEMBER_UPDATE';
  static REQUEST_MEMBER_UPDATE_FINISHED = 'MemberAction.REQUEST_MEMBER_UPDATE_FINISHED';
  static updateMember(member) {
    return async (dispatch, getState) => {
      const response = await ActionUtility.createThunkEffect(
        dispatch,
        MemberAction.REQUEST_MEMBER_UPDATE,
        MemberEffect.requestUpdateMember,
        member
      );
      if (!(response instanceof HttpErrorResponseModel)) {
        dispatch(ToastsAction.add('Se a editado un miembro', ToastStatusEnum.Success));
      }
    };
  }

  static REQUEST_MEMBER_BY_ID = 'MemberAction.REQUEST_MEMBER_BY_ID';
  static REQUEST_MEMBER_BY_ID_FINISHED = 'MemberAction.REQUEST_MEMBER_BY_ID_FINISHED';
  static getMemberById(id) {
    return async (dispatch, getState) => {
      await ActionUtility.createThunkEffect(
        dispatch,
        MemberAction.REQUEST_MEMBER_BY_ID,
        MemberEffect.requestMemberById,
        id
      );
    };
  }

  static REQUEST_MEMBER_DELETE = 'MemberAction.REQUEST_MEMBER_DELETE';
  static REQUEST_MEMBER_DELETE_FINISHED = 'MemberAction.REQUEST_MEMBER_DELETE_FINISHED';

  static deleteMember(id) {
    return async (dispatch, getState) => {
      await ActionUtility.createThunkEffect(
        dispatch,
        MemberAction.REQUEST_MEMBER_DELETE,
        MemberEffect.requestDeleteMember,
        id
      );
    };
  }

  static REQUEST_MEMBER_CREATE = 'MemberAction.REQUEST_MEMBER_CREATE';
  static REQUEST_MEMBER_CREATE_FINISHED = 'MemberAction.REQUEST_MEMBER_CREATE_FINISHED';

  static createMember(member) {
    return async (dispatch, getState) => {
      const response = await ActionUtility.createThunkEffect(
        dispatch,
        MemberAction.REQUEST_MEMBER_CREATE,
        MemberEffect.requestCreateMember,
        member
      );
      if (!(response instanceof HttpErrorResponseModel)) {
        dispatch(ToastsAction.add('Se a creado un miembro', ToastStatusEnum.Success));
      }
    };
  }

  static REQUEST_MEMBER_CREATE_USER_LOCAL = 'MemberAction.REQUEST_MEMBER_CREATE_USER_LOCAL';
  static REQUEST_MEMBER_CREATE_USER_LOCAL_FINISHED = 'MemberAction.REQUEST_MEMBER_CREATE_USER_LOCAL_FINISHED';

  static createMemberWithUserWithLocal(member, user, local) {
    return async (dispatch, getState) => {
      const response = await ActionUtility.createThunkEffect(
        dispatch,
        MemberAction.REQUEST_MEMBER_CREATE_USER_LOCAL,
        MemberEffect.requestCreateMemberWithUserWithLocal,
        member,
        local,
        user
      );
      if (!(response instanceof HttpErrorResponseModel)) {
        dispatch(ToastsAction.add('Se a creado un miembro', ToastStatusEnum.Success));
      }
    };
  }
}
