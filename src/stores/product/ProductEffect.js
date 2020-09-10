import environment from 'environment';
import * as EffectUtility from '../../utils/EffectUtility';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import ProductModel from '../../models/ProductModel';
import * as MultimediaEffect from '../multimedia/MultimediaEffect';
import { isIterableArray } from '../../template/helpers/utils';

export const requestProduct = async () => {
  const endpoint = environment.api.products.replace(':id', '');
  return await EffectUtility.getToModel(ProductModel, endpoint);
};

export const requestUpdateProduct = async ({ newMultimedia = [], ...product }) => {
  const endpoint = environment.api.products.replace(':id', product.id);
  let responseMultimediaList = await MultimediaEffect.requestCreateMultimediaList(newMultimedia, 'product_', '_image');
  if (responseMultimediaList instanceof HttpErrorResponseModel) {
    return responseMultimediaList;
  }
  product.multimedia = [...responseMultimediaList, ...product.multimedia];
  return await EffectUtility.putToModel(ProductModel, endpoint, product);
};

export const requestCreateProduct = async product => {
  const endpoint = environment.api.products.replace(':id', '');
  let responseMultimediaList = await MultimediaEffect.requestCreateMultimediaList(
    product.multimedia,
    'product_',
    '_image'
  );
  if (responseMultimediaList instanceof HttpErrorResponseModel) {
    return responseMultimediaList;
  }
  product.multimedia = [...responseMultimediaList];
  const response = await EffectUtility.postToModel(ProductModel, endpoint, product);
  if (response instanceof HttpErrorResponseModel) {
    if (isIterableArray(responseMultimediaList)) {
      await MultimediaEffect.requestDeleteMultimediaList(responseMultimediaList);
    }
  }
  return response;
};

export const requestProductById = async id => {
  const endpoint = environment.api.products.replace(':id', id);
  return await EffectUtility.getToModel(ProductModel, endpoint);
};

export const requestDeleteproduct = async id => {
  const endpoint = environment.api.products.replace(':id', id);
  const response = await EffectUtility.deleteToModel(ProductModel, endpoint);
  return response instanceof HttpErrorResponseModel ? response : id;
};

export const requestDeleteProductMultimediaById = async (id, idMultimedia) => {
  const endpoint = environment.api.products.replace(
    ':id',
    `delete-multimedia-by-id?id=${id}&idMultimedia=${idMultimedia}`
  );
  const response = await EffectUtility.deleteToModel(ProductModel, endpoint);
  return response instanceof HttpErrorResponseModel ? response : response;
};
