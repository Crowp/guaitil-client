import React, { useContext } from 'react';
import WizardInput from '../../../../components/WizardInput';
import Select from 'react-select';
import { Col } from 'reactstrap';
import { ReservationStateEnum } from '../../../../../constants';
import { ReservationContext } from '../../../../context';

const ReservationForm = ({ register, errors }) => {
  const selectOptions = [
    { value: ReservationStateEnum.Active, label: 'Activo' },
    { value: ReservationStateEnum.Cancelled, label: 'Cancelado' }
  ];

  const { reservation, handleInputChangeReservation } = useContext(ReservationContext);

  const { dateReservation, reservationState } = reservation;
  return (
    <>
      <WizardInput
        label="Fecha de reservación"
        id="dateReservation"
        customType="datetime"
        value={dateReservation}
        onChange={handleInputChangeReservation}
        name="dateReservation"
        placeholder="DD/MM/YYYY"
        innerRef={register({
          required: 'Seleccione la fecha de reservación'
        })}
        errors={errors}
      />
      <WizardInput
        type="number"
        label="Cantidad de personas"
        name="amountPerson"
        value={reservation}
        onChange={({ target }) => {
          handleInputChangeReservation(target);
        }}
        style={{ resize: 'none' }}
        id="amountPerson"
        innerRef={register({
          required: true
        })}
        errors={errors}
      />
    </>
  );
};

export default ReservationForm;
