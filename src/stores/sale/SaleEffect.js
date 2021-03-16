import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';

import { createSalesRequest } from './requests/SalesRequest';
import { createSalePutRequest } from './requests/SalePutRequest';
import { createSalePostRequest } from './requests/SalePostRequest';
import { createSaleDeleteRequest } from './requests/SaleDeleteRequest';

export const requestSale = async () => {
  return await createSalesRequest().getResponse();
};

export const requestSaleById = async id => {
  return await createSalesRequest(id).getResponse();
};

export const requestSaleByMemberId = async memberId => {
  return await createSalesRequest(`member-id/${memberId}`).getResponse();
};

export const requestUpdateSale = async sale => {
  return await createSalePutRequest(sale).getResponse();
};

export const requestCreateSale = async sale => {
  return await createSalePostRequest(sale).getResponse();
};

export const requestDeleteSale = async id => {
  const response = await createSaleDeleteRequest(id).getResponse();
  return response instanceof HttpErrorResponseModel ? response : id;
};
