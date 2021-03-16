import { useSelector } from 'react-redux';

const useUserssState = (selector = state => state.users) => useSelector(state => selector(state));

export default useUserssState;
