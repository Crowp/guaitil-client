import React from 'react';
import ModalInfo from '../../../../components/modals/ModalInfo';
import '../../../../../template/assets/styles-css/modal-styles/modalStyles.css';
import { getProductType } from '../../../../../utils/ProductType';
import { useSaleByIdEffect } from '../../../../hooks';

const ModalContainer = ({ modal, toggle, id }) => {
  const { sale = {} } = useSaleByIdEffect(id);
  const { productDescription = {}, saleDate, amountSold } = sale;
  const { name, productType, productPrice = {} } = productDescription;
  return (
    <ModalInfo toggle={toggle} modal={modal} modalTitle="Información de venta">
      <p>Nombre del producto vendido : {name} </p>
      <p>Tipo de producto: {getProductType(productType)} </p>
      <p>Fecha y hora de venta : {saleDate} </p>
      <p>Cantidad vendida : {amountSold} </p>
      <p>Precio de venta : ₡ {productPrice.sale} </p>
    </ModalInfo>
  );
};
export default ModalContainer;
