import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { selectAuthenticated } from '../../selectors/auth/AuthSelector';
import { useSelector } from 'react-redux';

const withAuthentication = OriginalComponent => {
  const UpdatedComponent = props => {
    const [redirect, setRedirect] = useState(false);
    const [redirectUrl, setRedirectUrl] = useState('/authentication/login');
    const isAuthenticated = useSelector(selectAuthenticated);

    if (!isAuthenticated || redirect) {
      return <Redirect to={redirectUrl} />;
    }

    return <OriginalComponent setRedirectUrl={setRedirectUrl} {...props} setRedirect={setRedirect} />;
  };

  return UpdatedComponent;
};

export default withAuthentication;
