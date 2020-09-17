import environment from 'environment';
import * as EffectUtility from '../../utils/EffectUtility';
import * as ProductEffect from '../product/ProductEffect';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import ProductReviewModel from '../../models/ProductReviewModel';

export const requestProductReviews = async () => {
  const endpoint = environment.api.productReviews.replace(':id', '');
  console.log(endpoint);
  return await EffectUtility.getToModel(ProductReviewModel, endpoint);
};

export const requestProductReviewsByMemberId = async id => {
  const endpoint = environment.api.productReviews.replace(':id', `member-id/${id}`);
  console.log(endpoint);
  return await EffectUtility.getToModel(ProductReviewModel, endpoint);
};

export const requestUpdateProductReview = async productReview => {
  const endpoint = environment.api.productReviews.replace(':id', productReview.id);

  const response = await ProductEffect.requestUpdateProduct(productReview.product);
  if (response instanceof HttpErrorResponseModel) {
    return response;
  }
  return await EffectUtility.putToModel(ProductReviewModel, endpoint, productReview);
};

export const requestCreateProductReview = async productReview => {
  const endpoint = environment.api.productReviews.replace(':id', '');
  return await EffectUtility.postToModel(ProductReviewModel, endpoint, productReview);
};
export const requestProductReviewById = async id => {
  const endpoint = environment.api.productReviews.replace(':id', id);
  return await EffectUtility.getToModel(ProductReviewModel, endpoint);
};

export const requestDeleteProductReview = async id => {
  const endpoint = environment.api.productReviews.replace(':id', id);
  const response = await EffectUtility.deleteToModel(ProductReviewModel, endpoint);
  return response instanceof HttpErrorResponseModel ? response : id;
};
