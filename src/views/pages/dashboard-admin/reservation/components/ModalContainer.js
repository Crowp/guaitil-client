import React from 'react';
import ModalInfo from '../../../../components/modals/ModalInfo';
import '../../../../../template/assets/styles-css/modal-styles/modalStyles.css';
import useReservationByIdEffect from '../../../../hooks/useReservationByIdEffect';
import { ReservationStateEnum } from '../../../../../constants';

const ModalContainer = ({ modal, toggle, id }) => {
  const { reservation = {} } = useReservationByIdEffect(id);
  const { activityDescription = {}, amountPerson, dateReservation, reservationState, person = {} } = reservation;

  return (
    <ModalInfo toggle={toggle} modal={modal} modalTitle="Información de reservación">
      <p>
        <span>Nombre del reservante :</span> {person.name} {person.firstLastName} {person.secondLastName}
      </p>
      <p>
        <span>Fecha y hora en que se realizó la reservación :</span> {dateReservation}
      </p>
      <p>
        <span>Estado de la reservación :</span>{' '}
        {reservationState === ReservationStateEnum.Active ? 'Activo' : 'Cancelado'}
      </p>
      <p>
        <span>Cantidad de personas :</span> {amountPerson}
      </p>
      <p>
        <span>Nombre de Actividad :</span> {activityDescription.name}
      </p>
      <p>
        <span>Fecha de actividad :</span> {activityDescription.activityDate}
      </p>
    </ModalInfo>
  );
};
export default ModalContainer;
