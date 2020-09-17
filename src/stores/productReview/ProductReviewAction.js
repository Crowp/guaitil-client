import ActionUtility from '../../utils/ActionUtility';
import * as ProductReviewEffect from './ProductReviewEffect';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import ToastsAction from '../toasts/ToastsAction';
import { ToastStatusEnum, RoleEnum } from '../../constants';

export default class ProductReviewAction {
  static REQUEST_PRODUCT_REVIEW = 'ProductReviewAction.REQUEST_PRODUCT_REVIEW';
  static REQUEST_PRODUCT_REVIEW_FINISHED = 'ProductReviewAction.REQUEST_PRODUCT_REVIEW_FINISHED';

  static getProductReviews() {
    return async (dispatch, getState) => {
      await ActionUtility.createThunkEffect(
        dispatch,
        ProductReviewAction.REQUEST_PRODUCT_REVIEW,
        ProductReviewEffect.requestProductReviews
      );
    };
  }

  static REQUEST_PRODUCT_REVIEW_BY_AUTH = 'ProductReviewAction.REQUEST_PRODUCT_REVIEW_BY_AUTH';
  static REQUEST_PRODUCT_REVIEW_BY_AUTH_FINISHED = 'ProductReviewAction.REQUEST_PRODUCT_REVIEW_BY_AUTH_FINISHED';

  static getProductReviewsByAuth() {
    return async (dispatch, getState) => {
      const {
        auth: { id, roles = [] }
      } = getState();
      await ActionUtility.createThunkEffect(
        dispatch,
        ProductReviewAction.REQUEST_PRODUCT_REVIEW_BY_AUTH,
        ProductReviewEffect.requestProductReviewsByMemberId,
        id
      );
    };
  }

  static REQUEST_PRODUCT_REVIEW_UPDATE = 'ProductReviewAction.REQUEST_PRODUCT_REVIEW_UPDATE';
  static REQUEST_PRODUCT_REVIEW_UPDATE_FINISHED = 'ProductReviewAction.REQUEST_PRODUCT_REVIEW_UPDATE_FINISHED';

  static updateProductReview(productReview) {
    return async (dispatch, getState) => {
      const response = await ActionUtility.createThunkEffect(
        dispatch,
        ProductReviewAction.REQUEST_PRODUCT_REVIEW_UPDATE,
        ProductReviewEffect.requestUpdateProductReview,
        productReview
      );
      if (!(response instanceof HttpErrorResponseModel)) {
        dispatch(ToastsAction.add('Se a editado una revisión de producto', ToastStatusEnum.Success));
      }
    };
  }

  static REQUEST_PRODUCT_REVIEW_BY_ID = 'ProductReviewAction.REQUEST_PRODUCT_REVIEW_BY_ID';
  static REQUEST_PRODUCT_REVIEW_BY_ID_FINISHED = 'ProductReviewAction.REQUEST_PRODUCT_REVIEW_BY_ID_FINISHED';
  static getProductReviewById(id) {
    return async (dispatch, getState) => {
      await ActionUtility.createThunkEffect(
        dispatch,
        ProductReviewAction.REQUEST_PRODUCT_REVIEW_BY_ID,
        ProductReviewEffect.requestProductReviewById,
        id
      );
    };
  }

  static REQUEST_PRODUCT_REVIEW_DELETE = 'ProductReviewAction.REQUEST_PRODUCT_REVIEW_DELETE';
  static REQUEST_PRODUCT_REVIEW_DELETE_FINISHED = 'ProductReviewAction.REQUEST_PRODUCT_REVIEW_DELETE_FINISHED';

  static deleteProductReview(id) {
    return async (dispatch, getState) => {
      await ActionUtility.createThunkEffect(
        dispatch,
        ProductReviewAction.REQUEST_PRODUCT_REVIEW_DELETE,
        ProductReviewEffect.requestDeleteProductReview,
        id
      );
    };
  }

  static REQUEST_PRODUCT_REVIEW_CREATE = 'ProductReviewAction.REQUEST_PRODUCT_REVIEW_CREATE';
  static REQUEST_PRODUCT_REVIEW_CREATE_FINISHED = 'ProductReviewAction.REQUEST_PRODUCT_REVIEW_CREATE_FINISHED';

  static createProductReview(productReview) {
    return async (dispatch, getState) => {
      const response = await ActionUtility.createThunkEffect(
        dispatch,
        ProductReviewAction.REQUEST_PRODUCT_REVIEW_CREATE,
        ProductReviewEffect.requestCreateProductReview,
        productReview
      );
      if (!(response instanceof HttpErrorResponseModel)) {
        dispatch(ToastsAction.add('Se a creado una revisión de producto', ToastStatusEnum.Success));
      }
    };
  }
}
