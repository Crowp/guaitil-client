import React from 'react';

import FormLocalContainer from './components/FormLocalContainer';

import { useLocalById, useUserByMemberId, useErrorRedirect, useMembers } from '../../../hooks';
import { RouteMap } from '../../../../constants';

const EditLocal = ({
  match: {
    params: { id }
  }
}) => {
  const { isRequesting: isRequestingMembers } = useMembers();
  const { local, isRequesting: isLocalRequesting, hasErrors: hasLocalErrors } = useLocalById(id);
  const { user, isRequesting: isUserRequesting, hasErrors: hasUserErrors } = useUserByMemberId(local.member?.id);

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
