import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import ShowsReducer from './shows/ShowsReducer';
import RequestingReducer from './requesting/RequestingReducer';
import ErrorReducer from './error/ErrorReducer';
import ToastsReducer from './toasts/ToastsReducer';

export default function rootReducer(history) {
  const reducerMap = {
    error: ErrorReducer.reducer,
    requesting: RequestingReducer.reducer,
    router: connectRouter(history),
    shows: new ShowsReducer().reducer,
    toasts: new ToastsReducer().reducer
  };

  return combineReducers(reducerMap);
}
