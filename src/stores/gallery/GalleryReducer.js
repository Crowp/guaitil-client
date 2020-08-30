import GalleryAction from './GalleryAction';
import BaseReducer from '../../utils/BaseReducer';

export default class GalleryReducer extends BaseReducer {
  initialState = {};

  [GalleryAction.REQUEST_GALLERY_FINISHED](state, action) {
    return { ...action.payload };
  }

  [GalleryAction.REQUEST_GALLERY_ADD_MULTIMEDIA_FINISHED](state, action) {
    return { ...action.payload };
  }

  [GalleryAction.REQUEST_GALLERY_DELETE_MULTIMEDIA_FINISHED](state, action) {
    const id = action.payload;
    const multimedia = [...state.multimedia.filter(model => model.id !== id)];
    return { ...state, multimedia };
  }
}
