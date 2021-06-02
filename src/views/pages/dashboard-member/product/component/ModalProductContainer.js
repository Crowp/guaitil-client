import React from 'react';
import ModalInfo from '../../../../components/modals/ModalInfo';
import '../../../../../template/assets/styles-css/modal-styles/modalStyles.css';
import { getProductType } from '../../../../../utils/ProductType';
import useProductByIdEffect from '../../../../hooks/useProductsByIdEffect';
import { Col, Row, FormGroup, Label, Input } from 'reactstrap';

const ModalContainer = ({ modal, toggle, id }) => {
  const { product = {} } = useProductByIdEffect(id);
  const { local = {}, productDescription = {}, showProduct } = product;
  const { description, productPrice = {}, productType, name } = productDescription;
  const { localDescription = {} } = local;

  return (
    <ModalInfo toggle={toggle} modal={modal} modalTitle="Información del producto" size="lg">
      <Row form>
        <Col sm={12}>
          <FormGroup>
            <Label for="localName">Nombre del local</Label>
            <Input id="localName" name="localName" value={localDescription.localName} disabled={true} />
          </FormGroup>
        </Col>
        <Col sm={12}>
          <FormGroup>
            <Label for="productName">Nombre del producto</Label>
            <Input id="productName" name="productName" value={name} disabled={true} />
          </FormGroup>
        </Col>
        <Col sm={6}>
          <FormGroup>
            <Label for="cost">Precio costo del producto </Label>
            <Input id="cost" name="cost" value={'₡ ' + productPrice.cost} disabled={true} />
          </FormGroup>
        </Col>
        <Col sm={6}>
          <FormGroup>
            <Label for="sale">Precio venta del producto </Label>
            <Input id="sale" name="sale" value={'₡ ' + productPrice.sale} disabled={true} />
          </FormGroup>
        </Col>
        <Col sm={6}>
          <FormGroup>
            <Label for="productType">Tipo de producto </Label>
            <Input id="productType" name="productType" value={getProductType(productType)} disabled={true} />
          </FormGroup>
        </Col>
        <Col sm={6}>
          <FormGroup>
            <Label for="showProduct">Estado del producto</Label>
            <Input id="showProduct" name="showProduct" value={showProduct ? 'Activo' : 'Inactivo'} disabled={true} />
          </FormGroup>
        </Col>
        <Col sm={12}>
          <FormGroup>
            <Label for="description">Descripción del producto</Label>
            <Input
              id="description"
              type="textarea"
              rows="4"
              style={{ resize: 'none' }}
              name="description"
              value={description}
              disabled={true}
            />
          </FormGroup>
        </Col>
      </Row>
    </ModalInfo>
  );
};
export default ModalContainer;
