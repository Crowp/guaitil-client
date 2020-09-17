import ActionUtility from '../../utils/ActionUtility';
import * as SaleEffect from './SaleEffect';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import ToastsAction from '../toasts/ToastsAction';
import { ToastStatusEnum } from '../../constants';

export default class SaleAction {
  static REQUEST_SALE = 'SaleAction.REQUEST_SALE';
  static REQUEST_SALE_FINISHED = 'SaleAction.REQUEST_SALE_FINISHED';

  static getSales() {
    return async (dispatch, getState) => {
      await ActionUtility.createThunkEffect(dispatch, SaleAction.REQUEST_SALE, SaleEffect.requestSale);
    };
  }

  static REQUEST_SALES_BY_MEMBER_ID = 'ProductAction.REQUEST_SALES_BY_MEMBER_ID';
  static REQUEST_SALES_BY_MEMBER_ID_FINISHED = 'ProductAction.REQUEST_SALES_BY_MEMBER_ID_FINISHED';

  static getSalesByMemberId() {
    return async (dispatch, getState) => {
      const {
        auth: { id }
      } = getState();
      await ActionUtility.createThunkEffect(
        dispatch,
        SaleAction.REQUEST_SALES_BY_MEMBER_ID,
        SaleEffect.requestSaleByMemberId,
        id
      );
    };
  }

  static REQUEST_SALE_UPDATE = 'SaleAction.REQUEST_SALE_UPDATE';
  static REQUEST_SALE_UPDATE_FINISHED = 'SaleAction.REQUEST_SALE_UPDATE_FINISHED';

  static updateSale(sale) {
    return async (dispatch, getState) => {
      const response = await ActionUtility.createThunkEffect(
        dispatch,
        SaleAction.REQUEST_SALE_UPDATE,
        SaleEffect.requestUpdateSale,
        sale
      );
      if (!(response instanceof HttpErrorResponseModel)) {
        dispatch(ToastsAction.add('Me parto', ToastStatusEnum.Success));
      }
    };
  }

  static REQUEST_SALE_BY_ID = 'SaleAction.REQUEST_SALE_BY_ID';
  static REQUEST_SALE_BY_ID_FINISHED = 'SaleAction.REQUEST_SALE_BY_ID_FINISHED';
  static getSaleById(id) {
    return async (dispatch, getState) => {
      await ActionUtility.createThunkEffect(dispatch, SaleAction.REQUEST_SALE_BY_ID, SaleEffect.requestSaleById, id);
    };
  }

  static REQUEST_SALE_DELETE = 'SaleAction.REQUEST_SALE_DELETE';
  static REQUEST_SALE_DELETE_FINISHED = 'SaleAction.REQUEST_SALE_DELETE_FINISHED';

  static deleteSale(id) {
    return async (dispatch, getState) => {
      await ActionUtility.createThunkEffect(dispatch, SaleAction.REQUEST_SALE_DELETE, SaleEffect.requestDeleteSale, id);
    };
  }

  static REQUEST_SALE_CREATE = 'SaleAction.REQUEST_SALE_CREATE';
  static REQUEST_SALE_CREATE_FINISHED = 'SaleAction.REQUEST_SALE_CREATE_FINISHED';

  static createSale(sale) {
    return async (dispatch, getState) => {
      const response = await ActionUtility.createThunkEffect(
        dispatch,
        SaleAction.REQUEST_SALE_CREATE,
        SaleEffect.requestCreateSale,
        sale
      );
      if (!(response instanceof HttpErrorResponseModel)) {
        dispatch(ToastsAction.add('Se a registrado una venta', ToastStatusEnum.Success));
      }
    };
  }
}
