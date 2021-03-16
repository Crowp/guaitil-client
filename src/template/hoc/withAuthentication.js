import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectAuthenticated } from '../../selectors/auth/AuthSelector';
import { RouteMap } from '../../constants';

const withAuthentication = OriginalComponent => {
  const UpdatedComponent = props => {
    const [redirect, setRedirect] = useState(false);
    const [redirectUrl, setRedirectUrl] = useState(RouteMap.Auth.login());
    const isAuthenticated = useSelector(selectAuthenticated);

    if (!isAuthenticated || redirect) {
      return <Redirect to={redirectUrl} />;
    }

    return <OriginalComponent setRedirectUrl={setRedirectUrl} {...props} setRedirect={setRedirect} />;
  };

  return UpdatedComponent;
};

export default withAuthentication;
