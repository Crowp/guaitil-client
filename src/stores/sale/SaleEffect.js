import environment from 'environment';
import * as EffectUtility from '../../utils/EffectUtility';
import SaleModel from '../../models/SaleModel';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';

export const requestSale = async () => {
  const endpoint = environment.api.sales.replace(':id', '');
  return await EffectUtility.getToModel(SaleModel, endpoint);
};

export const requestSaleByMemberId = async id => {
  const endpoint = environment.api.sales.replace(':id', 'member-id/' + id);
  return await EffectUtility.getToModel(SaleModel, endpoint);
};

export const requestUpdateSale = async sale => {
  const endpoint = environment.api.sales.replace(':id', sale.id);
  return await EffectUtility.putToModel(SaleModel, endpoint, sale);
};

export const requestCreateSale = async sale => {
  const endpoint = environment.api.sales.replace(':id', '');
  return await EffectUtility.postToModel(SaleModel, endpoint, sale);
};
export const requestSaleById = async id => {
  const endpoint = environment.api.sales.replace(':id', id);
  return await EffectUtility.getToModel(SaleModel, endpoint);
};

export const requestDeleteSale = async id => {
  const endpoint = environment.api.sales.replace(':id', id);
  const response = await EffectUtility.deleteToModel(SaleModel, endpoint);
  return response instanceof HttpErrorResponseModel ? response : id;
};
