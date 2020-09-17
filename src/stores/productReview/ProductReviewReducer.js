import ProductReviewAction from './ProductReviewAction';
import BaseReducer from '../../utils/BaseReducer';

export default class ReservationReducer extends BaseReducer {
  initialState = [];

  [ProductReviewAction.REQUEST_PRODUCT_REVIEW_FINISHED](state, action) {
    return [...action.payload];
  }

  [ProductReviewAction.REQUEST_PRODUCT_REVIEW_BY_AUTH_FINISHED](state, action) {
    return [...action.payload];
  }

  [ProductReviewAction.REQUEST_PRODUCT_REVIEW_UPDATE_FINISHED](state, action) {
    const reservation = action.payload;
    return [reservation, ...state.filter(model => model.id !== reservation.id)];
  }
  [ProductReviewAction.REQUEST_PRODUCT_REVIEW_DELETE_FINISHED](state, action) {
    const id = action.payload;
    return [...state.filter(model => model.id !== id)];
  }

  [ProductReviewAction.REQUEST_PRODUCT_REVIEW_CREATE_FINISHED](state, action) {
    const reservation = action.payload;
    return [reservation, ...state];
  }

  [ProductReviewAction.REQUEST_PRODUCT_REVIEW_BY_ID_FINISHED](state, action) {
    const reservation = action.payload;
    return [reservation, ...state];
  }
}
