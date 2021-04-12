import React, { useContext } from 'react';
import moment from 'moment';
import { ReservationContext } from '../../../../../../context';
import { disablePastDt } from '../../../../../../components/date/handleDisableDate';
import { DatetimeInputForm, InputForm, SelectInputForm } from '../../../../../../components/forms/inputs';
import { ReservationStateEnum } from '../../../../../../../constants';
import Select from 'react-select';

const ReservationForm = ({ register, errors, control, isUpdate }) => {
  const { reservation, handleInputChangeReservation } = useContext(ReservationContext);

  const { dateReservation, amountPerson, reservationState } = reservation;
  const selectDate = new Date(moment(dateReservation));
  const selectOptions = [
    { value: ReservationStateEnum.Active, label: 'Activa' },
    { value: ReservationStateEnum.Cancelled, label: 'Cancelada' }
  ];
  return (
    <>
      <DatetimeInputForm
        id="dateReservation"
        name="dateReservation"
        label="Fecha de reservación"
        isValidDate={disablePastDt}
        value={selectDate}
        onChange={handleInputChangeReservation}
        errors={errors}
      />
      {isUpdate && (
        <SelectInputForm
          type="select"
          label="Estado de reservación"
          placeholder="Estado"
          tag={Select}
          name="reservationState"
          id="reservationState"
          control={control}
          value={selectOptions.filter(x => x.value === reservationState)[0]}
          onChange={handleInputChangeReservation}
          options={selectOptions}
          errorMessage="Seleccione el estado"
          errors={errors}
        />
      )}
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
