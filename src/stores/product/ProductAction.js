import ActionUtility from '../../utils/ActionUtility';
import * as ProductEffect from './ProductEffect';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import ToastsAction from '../toasts/ToastsAction';
import { ToastStatusEnum } from '../../constants';

export default class ProductAction {
  static REQUEST_PRODUCT = 'ProductAction.REQUEST_PRODUCT';
  static REQUEST_PRODUCT_FINISHED = 'ProductAction.REQUEST_PRODUCT_FINISHED';

  static getProducts() {
    return async (dispatch, getState) => {
      await ActionUtility.createThunkEffect(dispatch, ProductAction.REQUEST_PRODUCT, ProductEffect.requestProduct);
    };
  }

  static REQUEST_PRODUCT_UPDATE = 'ProductAction.REQUEST_PRODUCT_UPDATE';
  static REQUEST_PRODUCT_UPDATE_FINISHED = 'ProductAction.REQUEST_PRODUCT_UPDATE_FINISHED';
  static updateProduct(product) {
    return async (dispatch, getState) => {
      const response = await ActionUtility.createThunkEffect(
        dispatch,
        ProductAction.REQUEST_PRODUCT_UPDATE,
        ProductEffect.requestUpdateProduct,
        product
      );
      if (!(response instanceof HttpErrorResponseModel)) {
        dispatch(ToastsAction.add('Se a editado un producto', ToastStatusEnum.Success));
      }
    };
  }

  static REQUEST_PRODUCT_BY_ID = 'ProductAction.REQUEST_PRODUCT_BY_ID';
  static REQUEST_PRODUCT_BY_ID_FINISHED = 'ProductAction.REQUEST_PRODUCT_BY_ID_FINISHED';
  static getMemberById(id) {
    return async (dispatch, getState) => {
      await ActionUtility.createThunkEffect(
        dispatch,
        ProductAction.REQUEST_PRODUCT_BY_ID,
        ProductEffect.requestProductById,
        id
      );
    };
  }

  static REQUEST_PRODUCT_DELETE = 'ProductAction.REQUEST_PRODUCT_DELETE';
  static REQUEST_PRODUCT_DELETE_FINISHED = 'ProductAction.REQUEST_PRODUCT_DELETE_FINISHED';

  static deleteProduct(id) {
    return async (dispatch, getState) => {
      await ActionUtility.createThunkEffect(
        dispatch,
        ProductAction.REQUEST_PRODUCT_DELETE,
        ProductEffect.requestDeleteproduct,
        id
      );
    };
  }

  static REQUEST_PRODUCT_CREATE = 'ProductAction.REQUEST_PRODUCT_CREATE';
  static REQUEST_PRODUCT_CREATE_FINISHED = 'ProductAction.REQUEST_PRODUCT_CREATE_FINISHED';

  static createProduct(product) {
    return async (dispatch, getState) => {
      const response = await ActionUtility.createThunkEffect(
        dispatch,
        ProductAction.REQUEST_PRODUCT_CREATE,
        ProductEffect.requestCreateProduct,
        product
      );
      if (!(response instanceof HttpErrorResponseModel)) {
        dispatch(ToastsAction.add('Se a creado un producto', ToastStatusEnum.Success));
      }
    };
  }
}
