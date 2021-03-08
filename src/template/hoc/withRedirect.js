import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { RouteMap } from '../../constants';

const withRedirect = OriginalComponent => {
  const UpdatedComponent = props => {
    // State
    const [redirect, setRedirect] = useState(false);
    const [redirectUrl, setRedirectUrl] = useState(RouteMap.Home.root());

    if (redirect) {
      return <Redirect to={redirectUrl} />;
    }

    return <OriginalComponent setRedirect={setRedirect} setRedirectUrl={setRedirectUrl} {...props} />;
  };

  return UpdatedComponent;
};

export default withRedirect;
