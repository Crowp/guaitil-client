import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectAuth } from '../../selectors/auth/AuthSelector';
import { RouteMap } from '../../constants';

const withFistLoginOrResetPassword = OriginalComponent => {
  const UpdatedComponent = props => {
    const [redirectUrl] = useState(RouteMap.Auth.resetPassword());
    const { firstLogin, resetPassword } = useSelector(selectAuth);

    if (firstLogin || resetPassword) {
      return <Redirect to={redirectUrl} />;
    }

    return <OriginalComponent {...props} />;
  };

  return UpdatedComponent;
};

export default withFistLoginOrResetPassword;
