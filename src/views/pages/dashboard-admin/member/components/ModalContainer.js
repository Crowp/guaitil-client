import React from 'react';
import ModalInfo from '../../../../components/modals/ModalInfo';
import useMemberByIdEffect from '../../../../hooks/useMemberByIdEffect';
import '../../../../../template/assets/styles-css/modal-styles/modalStyles.css';
import { Col, Row, FormGroup, Label, Input } from 'reactstrap';

const ModalContainer = ({ modal, toggle, id }) => {
  const { member } = useMemberByIdEffect(id);
  const { locals = [], occupation, person = {}, memberType } = member;
  const showMemberType = memberType === 'REGULAR' ? 'regular' : 'Asociado';
  return (
    <ModalInfo toggle={toggle} modal={modal} modalTitle="Información del miembro" size="lg">
      <Row form>
        <Col sm={6}>
          <FormGroup>
            <Label for="id">Número de cédula</Label>
            <Input id="id" name="id" value={person.id} disabled={true} />
          </FormGroup>
        </Col>
        <Col sm={6}>
          <FormGroup>
            <Label for="name">Nombre</Label>
            <Input
              id="name"
              name="name"
              value={person.name + ' ' + person.firstLastName + ' ' + person.secondLastName}
              disabled={true}
            />
          </FormGroup>
        </Col>
        <Col sm={12}>
          <FormGroup>
            <Label for="email">Correo electrónico</Label>
            <Input id="email" name="email" disabled={true} value={person.email} />
          </FormGroup>
        </Col>
        <Col sm={6}>
          <FormGroup>
            <Label for="telephone">Número de telefono</Label>
            <Input id="telephone" name="telephone" value={person.telephone} disabled={true} />
          </FormGroup>
        </Col>
        <Col sm={6}>
          <FormGroup>
            <Label for="memberType">Tipo miembro</Label>
            <Input id="memberType" name="memberType" value={showMemberType} disabled={true} />
          </FormGroup>
        </Col>
        <Col sm={12}>
          <FormGroup>
            <Label>Ocupación</Label>
            <Input
              id="occupation"
              name="occupation"
              rows="4"
              value={occupation}
              style={{ resize: 'none' }}
              disabled={true}
            />
          </FormGroup>
        </Col>
      </Row>

      {locals.length !== 0 ? (
        <div className="modal-info-container">
          <span>Locales a cargo </span>
          <ol>
            {locals.map((local, index) => {
              return <li key={index}>{local.localDescription.localName}</li>;
            })}
          </ol>
        </div>
      ) : (
        <p>
          <span>* Este miembro no tiene locales a cargo </span>
        </p>
      )}
    </ModalInfo>
  );
};
export default ModalContainer;
