import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import LocalAction from '../../stores/local/LocalAction';
import useIsRequesting from './useIsRequesting';
import useHasErrors from './useHasErrors';
import useLocalsState from './useLocalsState';

const useLocalByLocalTypeEffect = (type, selector = state => state.locals) => {
  const dispatch = useDispatch();
  const isRequesting = useIsRequesting([LocalAction.REQUEST_LOCAL_BY_LOCAL_TYPE]);
  const items = useLocalsState(selector);
  const hasErrors = useHasErrors([LocalAction.REQUEST_LOCAL_BY_LOCAL_TYPE_FINISHED]);
  useEffect(() => {
    dispatch(LocalAction.getLocalByLocalType(type));
  }, [dispatch, type]);
  return { isRequesting, items, hasErrors };
};

export default useLocalByLocalTypeEffect;
