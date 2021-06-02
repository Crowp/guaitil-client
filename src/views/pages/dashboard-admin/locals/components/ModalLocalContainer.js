import React from 'react';
import ModalInfo from '../../../../components/modals/ModalInfo';
import '../../../../../template/assets/styles-css/modal-styles/modalStyles.css';
import { useLocalByIdEffect } from '../../../../hooks';
import { getLocalType } from '../../../../../utils/LocalType';
import { Col, Row, FormGroup, Label, Input } from 'reactstrap';

const ModalContainer = ({ modal, toggle, id }) => {
  const { local = {} } = useLocalByIdEffect(id);
  const { localDescription = {}, member = {}, products = [], showLocal } = local;
  const { localName, localType, localTelephone, description = '' } = localDescription;
  const localState = showLocal ? 'El local está activo' : 'Local inactivo';
  const { person = {} } = member;
  return (
    <ModalInfo toggle={toggle} modal={modal} modalTitle="Información del local" size="lg">
      <Row form>
        <Col sm={6}>
          <FormGroup>
            <Label for="localName">Nombre del local</Label>
            <Input id="localName" name="localName" value={localName} disabled={true} />
          </FormGroup>
        </Col>
        <Col sm={6}>
          <FormGroup>
            <Label for="localMembername">Dueño del local</Label>
            <Input
              id="localMembername"
              name="localMembername"
              value={person.name + ' ' + person.firstLastName + ' ' + person.secondLastName}
              disabled={true}
            />
          </FormGroup>
        </Col>
        <Col sm={6}>
          <FormGroup>
            <Label for="localType">Tipo de local</Label>
            <Input id="localType" name="localType" value={getLocalType(localType)} disabled={true} />
          </FormGroup>
        </Col>
        <Col sm={6}>
          <FormGroup>
            <Label for="telephone">Número de telefono del local</Label>
            <Input id="telephone" name="telephone" value={localTelephone} disabled={true} />
          </FormGroup>
        </Col>
        <Col sm={12}>
          <FormGroup>
            <Label>Descripción</Label>
            <Input
              type="textarea"
              id="description"
              name="description"
              rows="4"
              value={description}
              style={{ resize: 'none' }}
              disabled={true}
            />
          </FormGroup>
        </Col>
      </Row>
      <p>* {localState}</p>
      {products.length > 0 ? <p>* Este local tiene productos aún</p> : <p>* Este local no tiene productos aún</p>}
    </ModalInfo>
  );
};
export default ModalContainer;
