import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import ShowsReducer from './shows/ShowsReducer';
import RequestingReducer from './requesting/RequestingReducer';
import ErrorReducer from './error/ErrorReducer';
import ToastsReducer from './toasts/ToastsReducer';
import UserReducer from './user/UserReducer';
import MemberReducer from './member/MemberReducer';
import LocalReducer from './local/LocalReducer';
import GalleryReducer from './gallery/GaleryReducer';

export default function rootReducer(history) {
  const reducerMap = {
    error: ErrorReducer.reducer,
    requesting: RequestingReducer.reducer,
    router: connectRouter(history),
    shows: new ShowsReducer().reducer,
    toasts: new ToastsReducer().reducer,
    auth: new UserReducer().reducer,
    members: new MemberReducer().reducer,
    locals: new LocalReducer().reducer,
    gallery: new GalleryReducer().reducer
  };

  return combineReducers(reducerMap);
}
