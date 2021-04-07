import React from 'react';

import FormUserContainer from './components/FormUserContainer';
import { useErrorRedirect, useUserByIdEffect } from '../../../hooks';
import { RouteMap } from '../../../../constants';
import { useParams } from 'react-router';

const EditUser = () => {
  const { id } = useParams();
  const { user, isRequesting, hasErrors } = useUserByIdEffect(id);

  const validationError = hasErrors && !isRequesting;
  useErrorRedirect(RouteMap.User.root(), validationError);
  const isEmptyObject = !Object.keys(user).length;

  console.log(user);

  return <FormUserContainer isloading={isRequesting || isEmptyObject} defaultItem={user} />;
};

export default React.memo(EditUser);
