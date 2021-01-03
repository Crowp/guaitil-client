import { useSelector } from 'react-redux';
import { selectRequesting } from '../../selectors/requesting/RequestingSelector';

const useIsRequesting = (actionTypes = []) => {
  const actionTypesFinished = actionTypes.map(actionType =>
    actionType.includes('_FINISHED') ? actionType.replace('_FINISHED', '') : actionType
  );
  const isRequesting = useSelector(state => selectRequesting(state, actionTypesFinished));
  return isRequesting;
};

export default useIsRequesting;
