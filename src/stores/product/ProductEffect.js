import environment from 'environment';
import * as EffectUtility from '../../utils/EffectUtility';
import HttpResponseModel from '../../models/HttpErrorResponseModel';
import ProductModel from '../../models/ProductModel';

export const requestProduct = async () => {
  const endpoint = environment.api.products.replace(':id', '');
  return await EffectUtility.getToModel(ProductModel, endpoint);
};

export const requestUpdateProduct = async product => {
  const endpoint = environment.api.products.replace(':id', product.id);
  return await EffectUtility.putToModel(ProductModel, endpoint, product);
};

export const requestCreateProduct = async product => {
  const endpoint = environment.api.products.replace(':id', '');
  return await EffectUtility.postToModel(ProductModel, endpoint, product);
};
export const requestProductById = async id => {
  const endpoint = environment.api.products.replace(':id', id);
  return await EffectUtility.getToModel(ProductModel, endpoint);
};

export const requestDeleteproduct = async id => {
  const endpoint = environment.api.products.replace(':id', id);
  const response = await EffectUtility.deleteToModel(ProductModel, endpoint);
  return response instanceof HttpResponseModel ? response : id;
};
