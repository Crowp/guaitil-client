import React from 'react';
import { Redirect } from 'react-router-dom';

import { selectRoles } from '../../selectors/auth/AuthSelector';
import { useSelector } from 'react-redux';
import { RouteMap } from '../../constants';

const withRoles = (roles = [], url = RouteMap.Dashboard.root()) => OriginalComponent => {
  const UpdatedComponent = props => {
    const authRoles = useSelector(selectRoles);

    const validateRoles = () => {
      return roles.some(role => authRoles.includes(role));
    };

    if (!validateRoles()) {
      return <Redirect to={url} />;
    }

    return <OriginalComponent {...props} />;
  };

  return UpdatedComponent;
};

export default withRoles;
