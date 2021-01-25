import { useSelector } from 'react-redux';

const useMembersState = (selector = state => state.members) => useSelector(state => selector(state));

export default useMembersState;
