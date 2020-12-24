import { LocalEnum } from '../constants';

export const getLocalType = localType => {
  let typeName = '';
  switch (localType) {
    case LocalEnum.Kitchen:
      typeName = 'Cocina';
      break;
    case LocalEnum.Workshop:
      typeName = 'Taller';
      break;
    case LocalEnum.Lodging:
      typeName = 'Alojamiento';
      break;
    case LocalEnum.Others:
      typeName = 'Otros';
      break;
    default:
      typeName = 'No Encontrado';
  }
  return typeName;
};
