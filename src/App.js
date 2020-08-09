import React from 'react';
import environment from 'environment';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './template/layouts/Layout';
import Main from './template/Main';

import 'react-toastify/dist/ReactToastify.min.css';
import 'react-datetime/css/react-datetime.css';
import 'react-image-lightbox/style.css';

const App = () => {
  console.log(environment);
  return (
    <Main>
      <Router basename={process.env.PUBLIC_URL}>
        <Layout />
      </Router>
    </Main>
  );
};

export default App;
