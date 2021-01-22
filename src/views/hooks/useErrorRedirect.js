import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import ErrorAction from '../../stores/error/ErrorAction';

const useErrorRedirect = (url, hasErrors = false) => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (hasErrors) {
      history.push(url);
      dispatch(ErrorAction.clearAll());
    }
  }, [hasErrors, url, history, dispatch]);
};

export default useErrorRedirect;
