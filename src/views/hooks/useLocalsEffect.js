import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import LocalAction from '../../stores/local/LocalAction';
import useIsRequesting from './useIsRequesting';
import useHasErrors from './useHasErrors';
import useLocalsState from './useLocalsState';

const useLocalsEffect = (selector = null) => {
  const dispatch = useDispatch();
  const isRequesting = useIsRequesting([LocalAction.REQUEST_LOCAL]);
  const items = useLocalsState(selector);
  const hasErrors = useHasErrors([LocalAction.REQUEST_LOCAL_FINISHED]);
  useEffect(() => {
    dispatch(LocalAction.getLocals());
  }, [dispatch]);
  return { isRequesting, items, hasErrors };
};

export default useLocalsEffect;
