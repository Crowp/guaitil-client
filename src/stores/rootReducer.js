import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import RequestingReducer from './requesting/RequestingReducer';
import ErrorReducer from './error/ErrorReducer';
import ToastsReducer from './toasts/ToastsReducer';
import AuthReducer from './auth/AuthReducer';
import MemberReducer from './member/MemberReducer';
import LocalReducer from './local/LocalReducer';
import GalleryReducer from './gallery/GalleryReducer';
import ActivityReducer from './activity/ActivityReducer';
import ReservationReducer from './reservation/ReservationReducer';
import ProductReducer from './product/ProductReducer';
import UserReducer from './user/UserReducer';
import SaleReducer from './sale/SaleReducer';
import ProductReviewReducer from './productReview/ProductReviewReducer';

export default function rootReducer(history) {
  const reducerMap = {
    error: ErrorReducer.reducer,
    requesting: RequestingReducer.reducer,
    router: connectRouter(history),
    toasts: new ToastsReducer().reducer,
    auth: new AuthReducer().reducer,
    users: new UserReducer().reducer,
    members: new MemberReducer().reducer,
    locals: new LocalReducer().reducer,
    gallery: new GalleryReducer().reducer,
    activities: new ActivityReducer().reducer,
    reservations: new ReservationReducer().reducer,
    products: new ProductReducer().reducer,
    sales: new SaleReducer().reducer,
    productReviews: new ProductReviewReducer().reducer
  };

  return combineReducers(reducerMap);
}
