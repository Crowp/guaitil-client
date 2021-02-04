import React, { useContext } from 'react';
import { disablePastDt } from '../../../../../../components/date/handleDisableDate';
import { ReservationContext } from '../../../../../../context';
import { DatetimeInputForm, InputForm } from '../../../../../../components/forms/inputs';

const ReservationForm = ({ register, errors }) => {
  const { reservation, handleInputChangeReservation } = useContext(ReservationContext);

  const { dateReservation, amountPerson } = reservation;

  return (
    <>
      <DatetimeInputForm
        id="dateReservation"
        name="dateReservation"
        label="Fecha de reservación"
        isValidDate={disablePastDt}
        value={dateReservation}
        onChange={handleInputChangeReservation}
        innerRef={register({
          required: 'Campo obligatorio',
          minLength: {
            value: 2,
            message: 'Debe ser de al menos 2 caracteres'
          }
        })}
        errors={errors}
      />
      <InputForm
        id="amountPerson"
        name="amountPerson"
        label="Cantidad de personas"
        placeholder="0"
        value={amountPerson}
        onChange={handleInputChangeReservation}
        type="number"
        innerRef={register({
          required: 'Campo obligatorio'
        })}
        errors={errors}
      />
    </>
  );
};

export default React.memo(ReservationForm);
