import ActionUtility from '../../utils/ActionUtility';
import * as GalleryEffect from './GalleryEffect';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import ToastsAction from '../toasts/ToastsAction';
import { ToastStatusEnum } from '../../constants';

export default class GalleryAction {
  static REQUEST_GALLERY = 'GalleryAction.REQUEST_GALLERY';
  static REQUEST_GALLERY_FINISHED = 'GalleryAction.REQUEST_GALLERY_FINISHED';

  static getGalery() {
    return async (dispatch, getState) => {
      await ActionUtility.createThunkEffect(dispatch, GalleryAction.REQUEST_GALLERY, GalleryEffect.requestGalery);
    };
  }

  static REQUEST_GALLERY_ADD_MULTIMEDIA = 'GalleryAction.REQUEST_GALLERY_ADD_MULTIMEDIA';
  static REQUEST_GALLERY_ADD_MULTIMEDIA_FINISHED = 'GalleryAction.REQUEST_GALLERY_ADD_MULTIMEDIA_FINISHED';

  static addMultimedia(multimedia) {
    return async (dispatch, getState) => {
      const response = await ActionUtility.createThunkEffect(
        dispatch,
        GalleryAction.REQUEST_GALLERY_ADD_MULTIMEDIA,
        GalleryEffect.requestAddMultimedia,
        multimedia
      );
      if (!(response instanceof HttpErrorResponseModel)) {
        dispatch(ToastsAction.add('Se a guardado correctamente', ToastStatusEnum.Success));
      }
    };
  }

  static REQUEST_GALLERY_DELETE_MULTIMEDIA = 'GalleryAction.REQUEST_GALLERY_DELETE_MULTIMEDIA';
  static REQUEST_GALLERY_DELETE_MULTIMEDIA_FINISHED = 'GalleryAction.REQUEST_GALLERY_DELETE_MULTIMEDIA_FINISHED';

  static deleteMultimedia(id) {
    return async (dispatch, getState) => {
      const response = await ActionUtility.createThunkEffect(
        dispatch,
        GalleryAction.REQUEST_GALLERY_DELETE_MULTIMEDIA,
        GalleryEffect.requestDeleteGaleryMultimedia,
        id
      );
      if (!(response instanceof HttpErrorResponseModel)) {
        dispatch(ToastsAction.add('Se ha eliminado una imagen', ToastStatusEnum.Success));
      }
    };
  }
}
