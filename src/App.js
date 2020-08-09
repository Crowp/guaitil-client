import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import Layout from './template/layouts/Layout';
import Main from './template/Main';

import 'react-toastify/dist/ReactToastify.min.css';
import 'react-datetime/css/react-datetime.css';
import 'react-image-lightbox/style.css';

const App = props => {
  return (
    <Main>
      <ConnectedRouter history={props.history}>
        <Layout />
      </ConnectedRouter>
    </Main>
  );
};

export default App;
