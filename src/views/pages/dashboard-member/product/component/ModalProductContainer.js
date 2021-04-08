import React from 'react';
import ModalInfo from '../../../../components/modals/ModalInfo';
import '../../../../../template/assets/styles-css/modal-styles/modalStyles.css';
import { getProductType } from '../../../../../utils/ProductType';
import useProductByIdEffect from '../../../../hooks/useProductsByIdEffect';

const ModalContainer = ({ modal, toggle, id }) => {
  const { product = {} } = useProductByIdEffect(id);
  const { local = {}, productDescription = {}, showProduct } = product;
  const { description, productPrice = {}, productType, name } = productDescription;
  const { localDescription = {} } = local;

  return (
    <ModalInfo toggle={toggle} modal={modal} modalTitle="Información del producto">
      <p>Nombre del local : {localDescription.localName}</p>
      <p>Nombre del producto : {name}</p>
      <p>Precio costo del producto : ₡ {productPrice.cost}</p>
      <p>Precio venta del producto : ₡ {productPrice.sale}</p>
      <p>Tipo de producto : {getProductType(productType)}</p>
      <p>Descripción del producto : {description}</p>
      <p>Estado del producto : {showProduct ? 'Activo' : 'Inactivo'}</p>
    </ModalInfo>
  );
};
export default ModalContainer;
