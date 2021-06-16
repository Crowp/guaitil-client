import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';

import { createProductReviewsRequest } from './requests/ProductReviewsRequest';
import { createProductReviewPostRequest } from './requests/ProductReviewPostRequest';
import { createProductReviewProductFilesPutRequest } from './requests/ProductReviewProductFilesPutRequest';
import { createProductReviewDeleteRequest } from './requests/ProductReviewDeleteRequest';

export const requestProductReviews = async () => {
  return await createProductReviewsRequest().getResponse();
};

export const requestProductReviewById = async id => {
  return await createProductReviewsRequest(id).getResponse();
};

export const requestProductReviewsByMemberId = async id => {
  return await createProductReviewsRequest(`member-id/${id}`).getResponse();
};

export const requestCreateProductReview = async productReview => {
  return await createProductReviewPostRequest(productReview).getResponse();
};

export const requestUpdateProductReview = async (productReview, isAdmin) => {
  return await createProductReviewProductFilesPutRequest(productReview, isAdmin).getResponse();
};

export const requestDeleteProductReview = async id => {
  const response = await createProductReviewDeleteRequest(id).getResponse();
  return response instanceof HttpErrorResponseModel ? response : id;
};
