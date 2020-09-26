import React, { useContext } from 'react';
import WizardInput from '../../../../components/WizardInput';
import { ReservationContext } from '../../../../context';

const ReservationForm = ({ register, errors }) => {
  const { reservation, handleInputChangeReservation } = useContext(ReservationContext);

  const { dateReservation } = reservation;
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
