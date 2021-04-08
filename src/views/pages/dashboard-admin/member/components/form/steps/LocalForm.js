import React, { useContext, useMemo } from 'react';
import { Col, Row } from 'reactstrap';

import { MemberContext } from '../../../../../../context';
import { LocalEnum } from '@/constants';
import { SelectInputForm, InputForm, CheckboxInputForm } from '../../../../../../components/forms/inputs';
import {
  phoneRegexPattern,
  whitespacesValidation,
  aCharacterValidation
} from '../../../../../../components/forms/inputs/validations';

const LocalForm = ({ register, errors, watch, isUpdate, control }) => {
  const { local, user, handleUserChange, handleLocalDescriptionChange, handleLocalChange } = useContext(MemberContext);
  const selectOptions = useMemo(
    () => [
      { value: LocalEnum.Kitchen, label: 'Cocina' },
      { value: LocalEnum.Workshop, label: 'Taller' },
      { value: LocalEnum.Lodging, label: 'Alojamiento' },
      { value: LocalEnum.Others, label: 'Otros' }
    ],
    []
  );
  const {
    localDescription: { localType = '', localName, localTelephone, description },
    state
  } = local;
  const { password, confirmPassword = '' } = user;

  return (
    <Row form>
      <Col xs={6}>
        <InputForm
          id="password"
          type="password"
          name="password"
          label="Contraseña*"
          value={password}
          placeholder="Contraseña..."
          autoComplete="off"
          onChange={handleUserChange}
          errors={errors}
          control={control}
          innerRef={register({
            required: isUpdate ? false : 'Debe especificar contraseña',
            minLength: {
              value: 2,
              message: 'Debe ser de al menos 2 caracteres'
            }
          })}
        />
      </Col>
      <Col xs={6}>
        <InputForm
          type="password"
          label="Confirmar Contraseña*"
          placeholder="Repetir"
          id="confirmPassword"
          autoComplete="on"
          value={confirmPassword}
          name="confirmPassword"
          errors={errors}
          control={control}
          innerRef={register({
            validate: value => value === watch('password') || 'La contraseña no coincide'
          })}
        />
      </Col>
      <Col xs={12}>
        <SelectInputForm
          id="localType"
          type="select"
          label="Tipo de local"
          placeholder="Tipo"
          name="localType"
          value={selectOptions.filter(x => x.value === localType)[0]}
          onChange={handleLocalDescriptionChange}
          errors={errors}
          options={selectOptions}
          control={control}
          errorMessage="Seleccione el local"
        />
      </Col>
      <Col xs={6}>
        <InputForm
          id="localName"
          name="localName"
          label="Nombre del local"
          placeholder="Nombre..."
          value={localName}
          control={control}
          onChange={handleLocalDescriptionChange}
          className="input-spin-none"
          innerRef={register({
            required: 'Campo obligatorio',
            minLength: {
              value: 2,
              message: 'Debe ser de al menos 2 caracteres'
            }
          })}
          errors={errors}
        />
      </Col>
      <Col xs={6}>
        <InputForm
          label="Número de teléfono*"
          placeholder="0000-0000"
          value={localTelephone}
          id="localTelephone"
          name="localTelephone"
          control={control}
          onChange={handleLocalDescriptionChange}
          innerRef={register({
            ...defaultInnerRef,
            minLength: {
              value: phoneRegexPattern,
              message: 'Número de telefono invalido'
            }
          })}
          errors={errors}
        />
      </Col>
      <Col xs={12}>
        <InputForm
          type="textarea"
          label="Descripción"
          name="description"
          rows="4"
          value={description}
          control={control}
          onChange={handleLocalDescriptionChange}
          style={{ resize: 'none' }}
          id="description"
          innerRef={register({
            required: 'Campo obligatorio'
          })}
          errors={errors}
        />
        <Col xs={6}>
          <CheckboxInputForm
            id="state"
            name="state"
            label="Mostrar el local en página"
            value={state}
            checked={state}
            onChange={handleLocalChange}
            errors={errors}
          />
        </Col>
      </Col>
    </Row>
  );
};

const defaultInnerRef = {
  required: 'Campo obligatorio',
  validate: {
    whitespacesValidation,
    aCharacterValidation
  },
  minLength: {
    value: 2,
    message: 'Debe ser de al menos 2 caracteres'
  }
};
export default React.memo(LocalForm);
