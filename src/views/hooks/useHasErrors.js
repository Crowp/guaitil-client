import { useSelector } from 'react-redux';
import { hasErrors } from '../../selectors/error/ErrorSelector';

const useHasErrors = (actionTypes = []) => {
  const actionTypesFinished = actionTypes.map(actionType =>
    actionType.includes('_FINISHED') ? actionType : `${actionType}_FINISHED`
  );
  const isError = useSelector(state => hasErrors(state, actionTypesFinished));
  return isError;
};

export default useHasErrors;
