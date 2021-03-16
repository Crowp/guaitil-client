import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import 'lazysizes';
// import a plugin
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import rootStore from './stores/rootStore';
import App from './App';
import './template/helpers/initFA';
import * as serviceWorker from './serviceWorker';

(async () => {
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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
