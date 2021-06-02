import React, { useContext, useMemo } from 'react';
import Select from 'react-select';
import { Col, Row } from 'reactstrap';
import { SelectInputForm, InputForm, DatetimeInputForm } from '../../../../../../components/forms/inputs';
import { disablePastDt } from '../../../../../../components/date/handleDisableDate';
import { ActivityContext } from '@/views/context';
import moment from 'moment';
import { ActivityEnum } from '@/constants';
import { noNumbersPattern, whitespacesValidation } from '../../../../../../components/forms/inputs/validations';

const ActivityForm = ({ register, errors, control }) => {
  const { activity, handleActivityDescriptionChange } = useContext(ActivityContext);

  const { activityDescription } = activity;
  const { name, activityType = '', personPrice, description, activityDate } = activityDescription;
  const selectDate = moment(activityDate);
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
            placeholder="Viaje al río..."
            onChange={handleActivityDescriptionChange}
            innerRef={register({
              required: 'Campo obligatorio',
              validate: {
                whitespacesValidation
              },
              minLength: {
                value: 15,
                message: 'Nombre de la actividad debe ser de al menos 15 caracteres'
              },
              maxLength: {
                value: 150,
                message: 'Nombre de la actividad no puede tener mas de  150 caracteres'
              },
              pattern: {
                value: noNumbersPattern,
                message: 'No se permiten numeros ni caracteres especiales'
              }
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
        control={control}
        value={selectOptions.filter(x => x.value === activityType)[0]}
        onChange={handleActivityDescriptionChange}
        errors={errors}
        errorMessage="Debe seleccionar el tipo de actividad"
        options={selectOptions}
      />
      {activityType === ActivityEnum.Tour && (
        <Row form>
          <Col>
            <InputForm
              type="number"
              label="Precio por persona (Colones)"
              placeholder="¢10.000"
              id="personPrice"
              value={personPrice}
              name="personPrice"
              onChange={handleActivityDescriptionChange}
              errors={errors}
              innerRef={register({
                required: 'Campo obligatorio',
                min: 1
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
        onChange={handleActivityDescriptionChange}
        id="description"
        innerRef={register({
          required: 'Campo obligatorio',
          validate: {
            whitespacesValidation
          },
          minLength: {
            value: 100,
            message: 'La descripción de la actividad debe ser de al menos 100 caracteres'
          },
          maxLength: {
            value: 2000,
            message: 'La descripción no puede tener más de  2000 caracteres'
          }
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
        onChange={handleActivityDescriptionChange}
        errors={errors}
      />
    </>
  );
};

export default React.memo(ActivityForm);
