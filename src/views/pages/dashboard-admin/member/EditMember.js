import React from 'react';
import FormMemberContainer from './components/FormMemberContainer';
import { useErrorRedirect, useMemberByIdEffect } from '../../../hooks';
import { RouteMap } from '../../../../constants';

const EditMember = ({
  match: {
    params: { id }
  }
}) => {
  const { member, isRequesting, hasErrors } = useMemberByIdEffect(id);
  const validatetionError = hasErrors && !isRequesting;
  useErrorRedirect(RouteMap.Member.root(), validatetionError);
  const isEmptyObject = !Object.keys(member).length;
  return <FormMemberContainer defaultItem={member} isLoading={isRequesting || isEmptyObject} />;
};

export default EditMember;
