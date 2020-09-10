import React, { useContext } from 'react';
import WizardInput from '../../components/WizardInput';
import Select from 'react-select';
import { ReservationStateEnum } from '../../../constants';
import { ReservationContext } from '../../context';

const ReservationEditForm = ({ register, errors }) => {
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
        customType="datetime"
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
      <WizardInput
        type="select"
        label="Estado de reservación"
        placeholder="Estado"
        tag={Select}
        name="reservationState"
        id="reservationState"
        value={selectOptions.filter(x => x.value === reservationState)[0]}
        onChange={({ value }) => {
          handleInputChangeReservation({ name: 'reservationState', value });
        }}
        innerRef={register({
          required: 'Seleccione un estado'
        })}
        errors={errors}
        options={selectOptions}
      />
    </>
  );
};

export default ReservationEditForm;
