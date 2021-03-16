import { useSelector } from 'react-redux';

const useActivitiesState = (selector = state => state.activities) => useSelector(state => selector(state));

export default useActivitiesState;
