import React from 'react';
import { useMembers, useUsers } from '../../../hooks';

import FormLocalContainer from './components/FormLocalContainer';

const CreateLocal = () => {
  const { isRequesting: isRequestingMembers } = useMembers();
  const { isRequesting: isRequestingUsers } = useUsers();
  return <FormLocalContainer isloading={isRequestingMembers || isRequestingUsers} />;
};

export default CreateLocal;
