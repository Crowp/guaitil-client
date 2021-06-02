import React from 'react';
import ModalInfo from '../../../../components/modals/ModalInfo';
import '../../../../../template/assets/styles-css/modal-styles/modalStyles.css';
import { useUserByIdEffect } from '../../../../hooks';
import { Col, Row, FormGroup, Label, Input } from 'reactstrap';

const ModalContainer = ({ modal, toggle, id }) => {
  const {
    user: { member = {}, roles = [] }
  } = useUserByIdEffect(id);
  const { person = {}, memberType, affiliationDate, occupation } = member;
  const showMemberType = memberType === 'REGULAR' ? 'regular' : 'Asociado';

  return (
    <ModalInfo toggle={toggle} modal={modal} modalTitle="Información del local" size="lg">
      <Row form>
        <Col sm={12}>
          <FormGroup>
            <Label for="name">Nombre de asociado</Label>
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
            <Label for="occupation">Ocupación</Label>
            <Input id="occupation" name="occupation" value={occupation} disabled={true} />
          </FormGroup>
        </Col>
        <Col sm={6}>
          <FormGroup>
            <Label for="memberType">Tipo de miembro</Label>
            <Input id="memberType" name="memberType" value={showMemberType} disabled={true} />
          </FormGroup>
        </Col>
        <Col sm={6}>
          <FormGroup>
            <Label for="affiliationDate">Fecha de afiliación</Label>
            <Input id="affiliationDate" name="affiliationDate" value={affiliationDate} disabled={true} />
          </FormGroup>
        </Col>
      </Row>
      <div>
        <span>Rol de usuario</span>
        <ol>
          {roles.map((role, index) => {
            return (
              <li key={index}>
                {role === 'ROLE_ADMIN'
                  ? 'Administrador'
                  : role === 'ROLE_SUPER_ADMIN'
                  ? 'Súper administrador'
                  : 'Miembro'}
              </li>
            );
          })}
        </ol>
      </div>
    </ModalInfo>
  );
};
export default ModalContainer;
