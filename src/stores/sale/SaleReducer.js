import SaleAction from './SaleAction';
import BaseReducer from '../../utils/BaseReducer';

export default class SaleReducer extends BaseReducer {
  initialState = [];

  [SaleAction.REQUEST_SALE_FINISHED](state, action) {
    return [...action.payload];
  }
  [SaleAction.REQUEST_SALE_UPDATE_FINISHED](state, action) {
    const sale = action.payload;
    return [sale, ...state.filter(model => model.id !== sale.id)];
  }
  [SaleAction.REQUEST_SALES_BY_MEMBER_ID_FINISHED](state, action) {
    return [...action.payload];
  }
  [SaleAction.REQUEST_SALE_DELETE_FINISHED](state, action) {
    const id = action.payload;
    return [...state.filter(model => model.id !== id)];
  }

  [SaleAction.REQUEST_SALE_CREATE_FINISHED](state, action) {
    const sale = action.payload;
    return [sale, ...state];
  }

  [SaleAction.REQUEST_SALE_BY_ID_FINISHED](state, action) {
    const sale = action.payload;
    return [sale, ...state];
  }
}
