import React, { useContext, useState } from 'react';
import WizardInput from '../components/WizardInput';
import { Col, CustomInput } from 'reactstrap';
import { ReservationContext } from '../context';

const ReservationForm = ({ register, errors }) => {
  const [isActive, setIsActive] = useState(false);
  console.log(isActive);
  const { reservation, handleInputChangeReservation } = useContext(ReservationContext);
  const { dateReservation } = reservation;

  return (
    <>
      <Col>
        <WizardInput
          label="Fecha de reservación"
          id="dateReservation"
          customType="datetime"
          value={dateReservation}
          onChange={handleInputChangeReservation}
          customType="datetime"
          name="dateReservation"
          placeholder="DD/MM/YYYY"
          innerRef={register({
            required: 'Seleccione la fecha de reservación'
          })}
          errors={errors}
        />
      </Col>
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
      <Col>
        <WizardInput
          type="checkbox"
          id="reservationState"
          tag={CustomInput}
          label="Marca si la reservacion esta activa"
          checked={isActive}
          onChange={({ target: { checked } }) => {
            setIsActive(checked);
          }}
          name="reservationState"
          errors={errors}
        />
      </Col>
    </>
  );
};

export default ReservationForm;
