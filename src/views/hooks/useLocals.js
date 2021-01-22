import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LocalAction from '../../stores/local/LocalAction';
import useIsRequesting from './useIsRequesting';
import useHasErrors from './useHasErrors';

const useLocals = (selector = state => state.locals) => {
  const dispatch = useDispatch();
  const isRequesting = useIsRequesting([LocalAction.REQUEST_LOCAL]);
  const items = useSelector(state => selector(state));
  const hasErrors = useHasErrors([LocalAction.REQUEST_LOCAL_FINISHED]);
  useEffect(() => {
    dispatch(LocalAction.getLocals());
  }, [dispatch]);
  return { isRequesting, items, hasErrors };
};

export default useLocals;
