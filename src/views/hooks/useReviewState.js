import { useSelector } from 'react-redux';

const useReviewsState = (selector = state => state.productReviews) => useSelector(state => selector(state));

export default useReviewsState;
