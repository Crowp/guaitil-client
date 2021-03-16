import { ProductEnum } from '../constants';

export const getProductType = productType => {
  let typeName = '';
  switch (productType) {
    case ProductEnum.Handicraft:
      typeName = 'Artesanía';
      break;
    case ProductEnum.Food:
      typeName = 'Comida';
      break;
    case ProductEnum.Other:
      typeName = 'Otro';
      break;
    default:
      typeName = 'No Encontrado';
  }
  return typeName;
};
