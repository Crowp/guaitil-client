import React from 'react';
import '../../../../template/assets/styles-css/modal-styles/modalStyles.css';
import { Col, Row, FormGroup, Label, Input } from 'reactstrap';
import ModalInfo from '../../../components/modals/ModalInfo';

const ModalContainer = ({ toggle, modal, item }) => {
  const { member = {}, localDescription = {} } = item;
  const { person = {} } = member;
  const { name, firstLastName, secondLastName, email } = person;
  const { localTelephone, localName, description } = localDescription;

  return (
    <ModalInfo toggle={toggle} modal={modal} isLanding={true} modalTitle="Información del local" size="lg">
      <Row form>
        <Col sm={12}>
          <FormGroup>
            <Label for="localName">Nombre del local</Label>
            <Input id="localName" name="localName" value={localName} disabled={true} />
          </FormGroup>
        </Col>
        <Col sm={12}>
          <FormGroup>
            <Label for="personName">Nombre del propietario</Label>
            <Input
              id="personName"
              name="personName"
              value={name + ' ' + firstLastName + ' ' + secondLastName}
              disabled={true}
            />
          </FormGroup>
        </Col>
        <Col sm={6}>
          <FormGroup>
            <Label for="email">Correo electrónico</Label>
            <Input id="email" name="email" value={email} disabled={true} />
          </FormGroup>
        </Col>
        <Col sm={6}>
          <FormGroup>
            <Label for="localTelephone">Teléfono</Label>
            <Input id="localTelephone" name="localTelephone" value={localTelephone} disabled={true} />
          </FormGroup>
        </Col>
        <Col sm={12}>
          <FormGroup>
            <Label for="description">Descripción</Label>
            <Input
              rows="4"
              style={{ resize: 'none' }}
              type="textarea"
              id="description"
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
