import React from 'react';
import { Col, Row, FormGroup, Label, Input } from 'reactstrap';

import ModalInfo from '../../../../components/modals/ModalInfo';
import '../../../../../template/assets/styles-css/modal-styles/modalStyles.css';
import { getProductType } from '../../../../../utils/ProductType';
import { useSaleByIdEffect } from '../../../../hooks';

const ModalContainer = ({ modal, toggle, id }) => {
  const { sale = {} } = useSaleByIdEffect(id);
  const { productDescription = {}, saleDate, amountSold } = sale;
  const { name, productType, productPrice = {} } = productDescription;
  return (
    <ModalInfo toggle={toggle} modal={modal} modalTitle="Información de venta" size="lg">
      <Row form>
        <Col sm={12}>
          <FormGroup>
            <Label for="productName">Nombre del producto vendido</Label>
            <Input id="productName" name="productName" value={name} disabled={true} />
          </FormGroup>
        </Col>
        <Col sm={12}>
          <FormGroup>
            <Label for="productType">Tipo de producto</Label>
            <Input id="productType" name="productType" value={getProductType(productType)} disabled={true} />
          </FormGroup>
        </Col>
        <Col sm={12}>
          <FormGroup>
            <Label for="saleDate">Fecha y hora de venta</Label>
            <Input id="saleDate" name="saleDate" value={saleDate} disabled={true} />
          </FormGroup>
        </Col>
        <Col sm={6}>
          <FormGroup>
            <Label for="amountSold">Cantidad vendida</Label>
            <Input id="amountSold" name="amountSold" value={amountSold} disabled={true} />
          </FormGroup>
        </Col>
        <Col sm={6}>
          <FormGroup>
            <Label for="salePrice">Precio de venta</Label>
            <Input id="salePrice" name="salePrice" value={'₡ ' + productPrice.sale} disabled={true} />
          </FormGroup>
        </Col>
      </Row>
    </ModalInfo>
  );
};
export default ModalContainer;
