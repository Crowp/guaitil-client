import { useSelector } from 'react-redux';

const useProductsState = (selector = state => state.products) => useSelector(state => selector(state));

export default useProductsState;
