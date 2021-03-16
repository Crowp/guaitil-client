import React from 'react';
import FormMemberContainer from './components/FormMemberContainer';
import { useErrorRedirect, useMemberByIdEffect } from '../../../hooks';
import { RouteMap } from '../../../../constants';
import { useParams } from 'react-router';

const EditMember = () => {
  const { id } = useParams();
  const { member, isRequesting, hasErrors } = useMemberByIdEffect(id);
  const validatetionError = hasErrors && !isRequesting;
  useErrorRedirect(RouteMap.Member.root(), validatetionError);
  const isEmptyObject = !Object.keys(member).length;
  return <FormMemberContainer defaultItem={member} isLoading={isRequesting || isEmptyObject} />;
};

export default EditMember;
