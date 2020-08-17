import React, { useEffect } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import Layout from './template/layouts/Layout';
import Main from './template/Main';
import ToastStatusEnum from './constants/ToastStatusEnum';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.min.css';
import 'react-datetime/css/react-datetime.css';
import 'react-image-lightbox/style.css';
import { useDispatch, useSelector } from 'react-redux';
import UserAction from './stores/user/UserAction';
import ToastsAction from './stores/toasts/ToastsAction';

const App = ({ history }) => {
  const dispatch = useDispatch();
  const items = useSelector(state => state.toasts.items);

  useEffect(() => {
    if (items.length) {
      items.forEach(toastItem => {
        switch (toastItem.type) {
          case ToastStatusEnum.Error: {
            toast.error(toastItem.message, { onClose: () => dispatch(ToastsAction.removeById(toastItem.id)) });
            break;
          }
          case ToastStatusEnum.Warning: {
            toast.warn(toastItem.message, { onClose: () => dispatch(ToastsAction.removeById(toastItem.id)) });
            break;
          }
          case ToastStatusEnum.Success: {
            toast.success(toastItem.message, { onClose: () => dispatch(ToastsAction.removeById(toastItem.id)) });
            break;
          }
          default: {
            toast(toastItem.message, { onClose: () => dispatch(ToastsAction.removeById(toastItem.id)) });
          }
        }
      });
    }
  }, [items, dispatch]);

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
