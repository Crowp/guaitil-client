import React, { useContext } from 'react';
import { disablePastDt } from '../../../../../../components/date/handleDisableDate';
import { ReservationContext } from '../../../../../../context';
import moment from 'moment';
import { DatetimeInputForm, InputForm } from '../../../../../../components/forms/inputs';

const ReservationForm = ({ register, errors }) => {
  const { reservation, handleInputChangeReservation } = useContext(ReservationContext);

  const { dateReservation, amountPerson } = reservation;
  const selectDate = new Date(moment(dateReservation));

  return (
    <>
      <DatetimeInputForm
        id="dateReservation"
        name="dateReservation"
        label="Fecha de reservación"
        isValidDate={disablePastDt}
        value={selectDate}
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
