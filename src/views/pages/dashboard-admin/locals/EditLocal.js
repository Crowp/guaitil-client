import React from 'react';
import FormLocalContainer from './components/FormLocalContainer';
import { useLocalByIdEffect, useUserByMemberIdEffect, useErrorRedirect, useMembersEffect } from '../../../hooks';
import { RouteMap } from '../../../../constants';
import { useParams } from 'react-router';

const EditLocal = () => {
  const { id } = useParams();
  const { isRequesting: isRequestingMembers } = useMembersEffect();
  const { local, isRequesting: isLocalRequesting, hasErrors: hasLocalErrors } = useLocalByIdEffect(id);
  const { user, isRequesting: isUserRequesting, hasErrors: hasUserErrors } = useUserByMemberIdEffect(local.member?.id);

  const validationError = (hasLocalErrors || hasUserErrors) && (!isLocalRequesting || !isUserRequesting);
  useErrorRedirect(RouteMap.Local.root(), validationError);
  const isEmptyObject = !Object.keys(local).length;
  return (
    <FormLocalContainer
      defaultItem={local}
      defaultUser={user}
      isLoading={isLocalRequesting || isUserRequesting || isRequestingMembers || isEmptyObject}
    />
  );
};

export default EditLocal;
