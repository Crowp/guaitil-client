import React from 'react';

import FormUserContainer from './components/FormUserContainer';
import { useErrorRedirect, useUserByIdEffect } from '../../../hooks';
import { RouteMap } from '../../../../constants';

const EditUser = ({
  match: {
    params: { id }
  }
}) => {
  const { user, isRequesting, hasErrors } = useUserByIdEffect(id);

  const validatetionError = hasErrors && !isRequesting;
  useErrorRedirect(RouteMap.User.root(), validatetionError);
  const isEmptyObject = !Object.keys(user).length;

  return <FormUserContainer isloading={isRequesting || isEmptyObject} defaultItem={user} />;
};

export default React.memo(EditUser);
