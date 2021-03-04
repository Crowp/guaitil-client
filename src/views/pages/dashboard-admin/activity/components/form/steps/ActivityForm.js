import React, { useContext, useMemo } from 'react';
import Select from 'react-select';
import { Col, Row } from 'reactstrap';
import { SelectInputForm, InputForm, DatetimeInputForm } from '../../../../../../components/forms/inputs';
import { disablePastDt } from '../../../../../../components/date/handleDisableDate';
import { ActivityContext } from '@/views/context';
import moment from 'moment';
import { ActivityEnum } from '@/constants';

const ActivityForm = ({ register, errors }) => {
  const { activity, handleInputChangeActivity } = useContext(ActivityContext);
  const { name, activityType = '', personCost, description, activityDate } = activity;
  const selectDate = new Date(moment(activityDate));
  console.log(selectDate);
  console.log(activityDate);
  const selectOptions = useMemo(
    () => [{ value: ActivityEnum.Tour, label: 'Tour' }, { value: ActivityEnum.Experience, label: 'Vivencia' }],
    []
  );
  return (
    <>
      <Row form>
        <Col>
          {' '}
          <InputForm
            id="name"
            type="text"
            name="name"
            label="Nombre de la actividad*"
            value={name}
            placeholder="Viaje al rio..."
            onChange={handleInputChangeActivity}
            innerRef={register({
              required: 'Seleccione al menos un local'
            })}
            errors={errors}
          />
        </Col>
      </Row>
      <SelectInputForm
        id="activityType"
        label="Tipo de actividad"
        placeholder="Tipo"
        name="activityType"
        tag={Select}
        value={selectOptions.filter(x => x.value === activityType)[0]}
        onChange={handleInputChangeActivity}
        errors={errors}
        options={selectOptions}
        innerRef={register({
          required: 'Seleccione un tipo de actividad'
        })}
      />
      {activityType === ActivityEnum.Tour && (
        <Row form>
          <Col>
            <InputForm
              type="number"
              label="Precio por persona (Colones)"
              placeholder="¢10.000"
              id="personCost"
              value={personCost}
              name="personCost"
              onChange={handleInputChangeActivity}
              errors={errors}
              innerRef={register({
                required: 'Campo obligatorio',
                min: 0
              })}
            />
          </Col>
        </Row>
      )}
      <InputForm
        type="textarea"
        label="Descripción"
        placeholder="Descripción"
        name="description"
        rows="4"
        value={description}
        onChange={handleInputChangeActivity}
        id="description"
        innerRef={register({
          required: false
        })}
        errors={errors}
      />
      <DatetimeInputForm
        id="activityDate"
        name="activityDate"
        label="Fecha de la actividad"
        isValidDate={disablePastDt}
        value={selectDate}
        autocomplete="off"
        onChange={handleInputChangeActivity}
        innerRef={register({
          required: 'Seleccione la fecha de inscripción'
        })}
        errors={errors}
      />
    </>
  );
};

export default React.memo(ActivityForm);
