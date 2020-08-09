import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import rootStore from './stores/rootStore';
import App from './App';
import './template/helpers/initFA';

(async window => {
  const initialState = {};
  const history = createBrowserHistory({ basename: process.env.PUBLIC_URL });
  const store = rootStore(initialState, history);

  const rootEl = document.getElementById('main');
  const render = (Component, el) => {
    ReactDOM.render(
      <Provider store={store}>
        <Component history={history} dispatch={store.dispatch} />
      </Provider>,
      el
    );
  };

  render(App, rootEl);
})(window);
