import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import ShowsReducer from './shows/ShowsReducer';
import RequestingReducer from './requesting/RequestingReducer';
import ErrorReducer from './error/ErrorReducer';
import ToastsReducer from './toasts/ToastsReducer';
import AuthReducer from './auth/AuthReducer';
import MemberReducer from './member/MemberReducer';
import LocalReducer from './local/LocalReducer';
import GalleryReducer from './gallery/GalleryReducer';
import ActivityReducer from './activity/ActivityReducer';
import TourReducer from './tour/TourReducer';
import ReservationReducer from './reservation/ReservationReducer';
import UserReducer from './user/UserReducer';

export default function rootReducer(history) {
  const reducerMap = {
    error: ErrorReducer.reducer,
    requesting: RequestingReducer.reducer,
    router: connectRouter(history),
    shows: new ShowsReducer().reducer,
    toasts: new ToastsReducer().reducer,
    auth: new AuthReducer().reducer,
    users: new UserReducer().reducer,
    members: new MemberReducer().reducer,
    locals: new LocalReducer().reducer,
    gallery: new GalleryReducer().reducer,
    activities: new ActivityReducer().reducer,
    reservations: new ReservationReducer().reducer,
    tours: new TourReducer().reducer
  };

  return combineReducers(reducerMap);
}
