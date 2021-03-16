import React from 'react';
import { useMembersEffect, useUsersEffect } from '../../../hooks';

import FormLocalContainer from './components/FormLocalContainer';

const CreateLocal = () => {
  const { isRequesting: isRequestingMembers } = useMembersEffect();
  const { isRequesting: isRequestingUsers } = useUsersEffect();
  return <FormLocalContainer isloading={isRequestingMembers || isRequestingUsers} />;
};

export default CreateLocal;
