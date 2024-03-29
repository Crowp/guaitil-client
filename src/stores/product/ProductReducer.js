import ProductAction from './ProductAction';
import BaseReducer from '../../utils/BaseReducer';

export default class ProductReducer extends BaseReducer {
  initialState = [];

  [ProductAction.REQUEST_PRODUCT_FINISHED](state, action) {
    return [...action.payload];
  }
  [ProductAction.REQUEST_PRODUCTS_BY_LOCAL_ID_FINISHED](state, action) {
    return [...action.payload];
  }
  [ProductAction.REQUEST_PRODUCTS_BY_PRODUCT_DESCRIPTION_ID_FINISHED](state, action) {
    return [action.payload, ...state];
  }
  [ProductAction.REQUEST_ALL_PRODUCTS_ACCEPTED_BY_LOCAL_ID_FINISHED](state, action) {
    return [...action.payload];
  }

  [ProductAction.REQUEST_PRODUCTS_BY_MEMBER_ID_FINISHED](state, action) {
    return [...action.payload];
  }

  [ProductAction.REQUEST_PRODUCT_UPDATE_FINISHED](state, action) {
    const product = action.payload;
    return [product, ...state.filter(model => model.id !== product.id)];
  }
  [ProductAction.REQUEST_PRODUCT_SHOW_FINISHED](state, action) {
    const product = action.payload;
    return [product, ...state.filter(model => model.id !== product.id)];
  }

  [ProductAction.REQUEST_PRODUCT_DELETE_MULTIMEDIA_BY_ID_FINISHED](state, action) {
    const product = action.payload;
    return [product, ...state.filter(model => model.id !== product.id)];
  }

  [ProductAction.REQUEST_PRODUCT_DELETE_FINISHED](state, action) {
    const id = action.payload;
    return [...state.filter(model => model.id !== id)];
  }

  [ProductAction.REQUEST_PRODUCT_CREATE_FINISHED](state, action) {
    const product = action.payload;
    return [product, ...state];
  }
  [ProductAction.REQUEST_PRODUCT_BY_ID_FINISHED](state, action) {
    const product = action.payload;
    return [product, ...state];
  }
}
