import { useSelector } from 'react-redux';

const useLocalDescriptionState = (selector = state => state.locals.localDescription) =>
  useSelector(state => selector(state));

export default useLocalDescriptionState;
