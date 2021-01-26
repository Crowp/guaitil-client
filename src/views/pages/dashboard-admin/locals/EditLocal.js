import React from 'react';
import FormLocalContainer from './components/FormLocalContainer';
import { useLocalByIdEffect, useUserByMemberIdEffect, useErrorRedirect, useMembersEffect } from '../../../hooks';
import { RouteMap } from '../../../../constants';

const EditLocal = ({
  match: {
    params: { id }
  }
}) => {
  const { isRequesting: isRequestingMembers } = useMembersEffect();
  const { local, isRequesting: isLocalRequesting, hasErrors: hasLocalErrors } = useLocalByIdEffect(id);
  const { user, isRequesting: isUserRequesting, hasErrors: hasUserErrors } = useUserByMemberIdEffect(local.member?.id);

  const validatetionError = (hasLocalErrors || hasUserErrors) && (!isLocalRequesting || !isUserRequesting);
  useErrorRedirect(RouteMap.Local.root(), validatetionError);
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
