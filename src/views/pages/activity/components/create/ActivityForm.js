import React, { useContext } from 'react';
import WizardInput from '../../../../components/WizardInput';
import Select from 'react-select';
import { ActivityContext, TourContext } from '../../../../context';
import { ActivityEnum } from '../../../../../constants';

const ActivityForm = ({ register, errors }) => {
  const { activity, handleInputChangeActivity } = useContext(ActivityContext);
  const { tour, handleInputChangeTour } = useContext(TourContext);

  const { activityType = '', activityDate } = activity;
  const selectOptions = [
    { value: ActivityEnum.Tour, label: 'Tour' },
    { value: ActivityEnum.Experience, label: 'Vivencia' }
  ];

  const onChangeTour = (name, value) => {
    handleInputChangeTour({ name, value });
  };

  return (
    <>
      <WizardInput
        label="Nombre de la actividad*"
        placeholder="Viaje al rio..."
        name="name"
        id="name"
        value={activity}
        onChange={({ target }) => {
          handleInputChangeActivity(target);
        }}
        innerRef={register({
          required: 'Campo obligatorio',
          minLength: {
            value: 2,
            message: 'Min length 2'
          }
        })}
        errors={errors}
      />
      <WizardInput
        type="select"
        label="Tipo de actividad"
        placeholder="Tipo"
        tag={Select}
        name="activityType"
        id="activityType"
        value={selectOptions.filter(x => x.value === activityType)[0]}
        onChange={({ value }) => {
          handleInputChangeActivity({ name: 'activityType', value });
        }}
        innerRef={register({
          required: 'Seleccione un tipo de actividad'
        })}
        errors={errors}
        options={selectOptions}
      />
      {activityType === ActivityEnum.Tour && (
        <WizardInput
          label="Precio por persona (Colones)"
          placeholder="¢10.000"
          type="number"
          name="amountPerson"
          id="amountPerson"
          value={tour}
          onChange={({ target: { name, value } }) => {
            onChangeTour(name, value);
          }}
          className="input-spin-none"
          innerRef={register({
            required: 'Campo obligatorio',
            min: 0
          })}
          errors={errors}
        />
      )}
      <WizardInput
        type="textarea"
        label="Descripción"
        name="description"
        rows="4"
        style={{ resize: 'none' }}
        id="description"
        value={activity}
        onChange={({ target }) => {
          handleInputChangeActivity(target);
        }}
        innerRef={register({
          required: false
        })}
        errors={errors}
      />
      <WizardInput
        label="Fecha de la actividad"
        id="activityDate"
        value={activityDate}
        onChange={handleInputChangeActivity}
        customType="datetime"
        name="activityDate"
        placeholder="DD/MM/YYYY"
        innerRef={register({
          required: 'Seleccione la fecha de inscripción'
        })}
        errors={errors}
      />
    </>
  );
};

export default React.memo(ActivityForm);
