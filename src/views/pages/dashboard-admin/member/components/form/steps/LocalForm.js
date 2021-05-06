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

const LocalForm = ({ register, errors, control }) => {
  const { local, handleLocalDescriptionChange, handleLocalChange } = useContext(MemberContext);
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

  return (
    <Row form>
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
            validate: {
              whitespacesValidation,
              aCharacterValidation
            },
            minLength: {
              value: 6,
              message: 'Nombre del local debe ser de al menos 10 caracteres'
            },
            maxLength: {
              value: 60,
              message: 'El nombre del local no puede tener mas de  60 caracteres'
            }
          })}
          errors={errors}
        />
      </Col>
      <Col xs={6}>
        <InputForm
          label="Número de teléfono*"
          type="number"
          placeholder="0000-0000"
          value={localTelephone}
          id="localTelephone"
          name="localTelephone"
          control={control}
          onChange={handleLocalDescriptionChange}
          innerRef={register({
            required: 'Campo obligatorio',
            validate: {
              whitespacesValidation,
              aCharacterValidation
            },
            minLength: {
              value: phoneRegexPattern,
              message: 'Número de teléfono invalido'
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
            required: 'Campo obligatorio',
            validate: {
              whitespacesValidation,
              aCharacterValidation
            },
            minLength: {
              value: 30,
              message: 'La descripción del local debe ser de al menos 30 caracteres'
            },
            maxLength: {
              value: 255,
              message: 'La descripción no puede tener mas de  255 caracteres'
            }
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

export default React.memo(LocalForm);
