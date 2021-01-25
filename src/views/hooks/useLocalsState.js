import { useSelector } from 'react-redux';

const useLocalsState = (selector = state => state.locals) => useSelector(state => selector(state));

export default useLocalsState;
