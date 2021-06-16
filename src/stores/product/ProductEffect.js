import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';

import { createProductsRequest } from './requests/ProductsRequest';
import { createProductDeleteRequest } from './requests/ProductDeleteRequest';
import { createProductDeleteFilesbyIdRequest } from './requests/ProductDeleteFilesById';
import { createProductFilesPostRequest } from './requests/ProductFilesPostRequest';
import { createProductFilesPutRequest } from './requests/ProductFilesPutRequest';
import { createProductPutByAdminUserRequest } from './requests/ProductPutByAdminUserRequest';
import { createProductRequestReport } from './requests/ProductRequestReport';

export const requestProduct = async () => {
  return await createProductsRequest().getResponse();
};

export const requestOnShowProduct = async id => {
  return await createProductsRequest(`show-product/${id}`).getResponse();
};
export const requestProductReportPdf = async id => {
  return await createProductRequestReport(`pdf-report/products/by-local-id?id=${id}`, 'pdf').getResponse();
};

export const requestProductReportExcel = async id => {
  return await createProductRequestReport(`xlsx-report/products/by-local-id?id=${id}`, 'xlsx').getResponse();
};
export const requestProductById = async id => {
  return await createProductsRequest(id).getResponse();
};

export const requestProductByLocalId = async id => {
  return await createProductsRequest(`local-id/${id}`).getResponse();
};

export const requestProductByProductDescriptionId = async id => {
  return await createProductsRequest(`product-description/${id}`).getResponse();
};

export const requestAllProductsAcceptedByLocalId = async id => {
  return await createProductsRequest(`state/local-id/${id}`).getResponse();
};

export const requestProductByMemberId = async id => {
  return await createProductsRequest(`member-id/${id}`).getResponse();
};

export const requestUpdateProduct = async product => {
  return await createProductFilesPutRequest(product).getResponse();
};
export const requestUpdateProductByAdminUser = async (id, product) => {
  return await createProductPutByAdminUserRequest(`/update/by-admin/${id}`, product).getResponse();
};

export const requestCreateProduct = async product => {
  return await createProductFilesPostRequest(product).getResponse();
};

export const requestDeleteproduct = async id => {
  const response = await createProductDeleteRequest(id).getResponse();
  return response instanceof HttpErrorResponseModel ? response : id;
};

export const requestDeleteProductMultimediaById = async (id, idMultimedia) => {
  return await createProductDeleteFilesbyIdRequest(id, idMultimedia).getResponse();
};
