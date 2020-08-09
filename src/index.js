import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './template/helpers/initFA';

ReactDOM.render(
  <App />,
  document.getElementById('main')
);
