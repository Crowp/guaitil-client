import React from 'react';
import { useUsersEffect } from '../../../hooks';
import useMembersWithoutAdminsEffect from '../../../hooks/useMembersWithoutAdmins';

import FormLocalContainer from './components/FormLocalContainer';

const CreateLocal = () => {
  const { isRequesting: isRequestingMembers } = useMembersWithoutAdminsEffect();
  const { isRequesting: isRequestingUsers } = useUsersEffect();
  return <FormLocalContainer isloading={isRequestingMembers || isRequestingUsers} />;
};

export default CreateLocal;
