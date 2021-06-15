import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';

import { createSalesRequest } from './requests/SalesRequest';
import { createSalePutRequest } from './requests/SalePutRequest';
import { createSalePostRequest } from './requests/SalePostRequest';
import { createSaleDeleteRequest } from './requests/SaleDeleteRequest';
import { createSaleRequestReport } from './requests/SaleRequestReport';

export const requestSale = async () => {
  return await createSalesRequest().getResponse();
};

export const requestSaleById = async id => {
  return await createSalesRequest(id).getResponse();
};
export const requestSaleReportPdf = async id => {
  return await createSaleRequestReport(`pdf-report/sales/by-member-id/id=${id}`, 'pdf').getResponse();
};

export const requestSaleReportExcel = async id => {
  return await createSaleRequestReport(`xlsx-report/sales/by-member-id/id=${id}`, 'xlsx').getResponse();
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
