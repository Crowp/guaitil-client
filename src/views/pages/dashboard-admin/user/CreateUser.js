import React from 'react';
import { useMembersWithoutUserEffect } from '../../../hooks';

import FormUserContainer from './components/FormUserContainer';

const CreateUser = () => {
  const { isRequesting: isRequestingMembers } = useMembersWithoutUserEffect();
  return <FormUserContainer isloading={isRequestingMembers} />;
};

export default CreateUser;
