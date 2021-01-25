import React from 'react';
import { ConnectedRouter } from 'connected-react-router/immutable';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-datetime/css/react-datetime.css';
import 'react-image-lightbox/style.css';

import Layout from './template/layouts/Layout';
import Main from './template/Main';
import { useToastEffect, useVerifyLoginEffect } from './views/hooks';

const App = ({ history }) => {
  useToastEffect();
  useVerifyLoginEffect();
  return (
    <Main>
      <ConnectedRouter history={history}>
        <Layout />
      </ConnectedRouter>
    </Main>
  );
};

export default App;
