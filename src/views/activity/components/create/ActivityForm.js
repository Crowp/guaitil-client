import React, { useContext } from 'react';
import WizardInput from '../../../components/WizardInput';
import Select from 'react-select';
import { ActivityContext } from '../../../context';
import { ActivityEnum } from '../../../../constants';

const ActivityForm = ({ register, errors }) => {
  const { activity, handleInputChangeActivity } = useContext(ActivityContext);
  const { activityType = '', activityDate, description } = activity;
  const selectOptions = [
    { value: ActivityEnum.Tour, label: 'Tour' },
    { value: ActivityEnum.Experience, label: 'Vivencia' }
  ];

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
      <WizardInput
        type="textarea"
        label="Dirección fisica"
        name="description"
        rows="4"
        style={{ resize: 'none' }}
        id="description"
        value={description}
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

export default ActivityForm;
