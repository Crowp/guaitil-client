import React, { useEffect } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import Layout from './template/layouts/Layout';
import Main from './template/Main';

import 'react-toastify/dist/ReactToastify.min.css';
import 'react-datetime/css/react-datetime.css';
import 'react-image-lightbox/style.css';
import { useDispatch } from 'react-redux';
import UserAction from './stores/user/UserAction';

const App = ({ history }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(UserAction.verifyLogin());
  }, [dispatch]);
  return (
    <Main>
      <ConnectedRouter history={history}>
        <Layout />
      </ConnectedRouter>
    </Main>
  );
};

export default App;
