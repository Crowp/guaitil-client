import React from 'react';
import { Redirect } from 'react-router-dom';

import { selectRoles } from '../../selectors/auth/AuthSelector';
import { useSelector } from 'react-redux';

const withRoles = (roles = []) => OriginalComponent => {
  const UpdatedComponent = props => {
    const authRoles = useSelector(selectRoles);

    const validateRoles = () => {
      return roles.some(role => authRoles.includes(role));
    };

    if (!validateRoles()) {
      return <Redirect to={redirectUrl} />;
    }

    return <OriginalComponent {...props} />;
  };

  return UpdatedComponent;
};

export default withRoles;
