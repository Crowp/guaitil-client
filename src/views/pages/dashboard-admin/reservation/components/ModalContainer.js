import React from 'react';
import ModalInfo from '../../../../components/modals/ModalInfo';
import '../../../../../template/assets/styles-css/modal-styles/modalStyles.css';
import useReservationByIdEffect from '../../../../hooks/useReservationByIdEffect';
import { Col, Row, FormGroup, Label, Input } from 'reactstrap';
import { ReservationStateEnum } from '../../../../../constants';

const ModalContainer = ({ modal, toggle, id }) => {
  const { reservation = {} } = useReservationByIdEffect(id);
  const { activityDescription = {}, amountPerson, dateReservation, reservationState, person = {} } = reservation;

  return (
    <ModalInfo toggle={toggle} modal={modal} modalTitle="Información de reservación" size="lg">
      <Row form>
        <Col sm={12}>
          <FormGroup>
            <Label for="personName">Nombre del reservante</Label>
            <Input
              id="personName"
              name="personName"
              value={person.name + ' ' + person.firstLastName + ' ' + person.secondLastName}
              disabled={true}
            />
          </FormGroup>
        </Col>
        <Col sm={6}>
          <FormGroup>
            <Label for="dateReservation">Fecha y hora en que se realizó la reservación</Label>
            <Input id="dateReservation" name="dateReservation" value={dateReservation} disabled={true} />
          </FormGroup>
        </Col>
        <Col sm={6}>
          <FormGroup>
            <Label for="reservationState">Estado de la reservación</Label>
            <Input
              id="reservationState"
              name="reservationState"
              value={reservationState === ReservationStateEnum.Active ? 'Activo' : 'Cancelado'}
              disabled={true}
            />
          </FormGroup>
        </Col>
        <Col sm={12}>
          <FormGroup>
            <Label for="name">Nombre de Actividad</Label>
            <Input id="name" name="name" value={activityDescription.name} disabled={true} />
          </FormGroup>
        </Col>
        <Col sm={6}>
          <FormGroup>
            <Label for="amountPerson">Cantidad de personas</Label>
            <Input id="amountPerson" name="amountPerson" value={amountPerson} disabled={true} />
          </FormGroup>
        </Col>
        <Col sm={6}>
          <FormGroup>
            <Label for="activityDate">Fecha de actividad</Label>
            <Input id="activityDate" name="activityDate" value={activityDescription.activityDate} disabled={true} />
          </FormGroup>
        </Col>
      </Row>
    </ModalInfo>
  );
};
export default ModalContainer;
