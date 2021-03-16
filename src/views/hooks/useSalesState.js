import { useSelector } from 'react-redux';

const useSalesState = (selector = state => state.sales) => useSelector(state => selector(state));

export default useSalesState;
