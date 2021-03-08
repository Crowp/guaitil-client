import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import LocalAction from '../../stores/local/LocalAction';
import useIsRequesting from './useIsRequesting';
import useHasErrors from './useHasErrors';
import useLocalDescriptionState from './useLocalDescriptionState';

const useLocalDescriptionEffect = (selector = state => state.locals.localDescription) => {
  const dispatch = useDispatch();
  const isRequesting = useIsRequesting([LocalAction.REQUEST_LOCAL]);
  const items = useLocalDescriptionState(selector);
  console.log(items);
  const hasErrors = useHasErrors([LocalAction.REQUEST_LOCAL_FINISHED]);
  useEffect(() => {
    dispatch(LocalAction.getLocals());
  }, [dispatch]);
  return { isRequesting, items, hasErrors };
};

export default useLocalDescriptionEffect;
