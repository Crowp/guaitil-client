import React, { useContext, useMemo, useEffect } from 'react';
import { Col, Row } from 'reactstrap';
import Loader from '@/template/components/common/Loader';
import { LocalEnum } from '@/constants';
import { useUserByMemberIdEffect } from '../../../../../../hooks';

import { SelectInputForm, InputForm, CheckboxInputForm } from '../../../../../../components/forms/inputs';
import { LocalContext } from '../../../../../../context';
import {
  noNumbersPattern,
  phoneRegexPattern,
  whitespacesValidation
} from '../../../../../../components/forms/inputs/validations';

const LocalForm = ({ register, errors, control }) => {
  const { local, setHasUser, handleLocalDescriptionChange, handleLocalChange } = useContext(LocalContext);

  const selectOptions = useMemo(
    () => [
      { value: LocalEnum.Kitchen, label: 'Cocina' },
      { value: LocalEnum.Workshop, label: 'Taller' },
      { value: LocalEnum.Lodging, label: 'Alojamiento' },
      { value: LocalEnum.Others, label: 'Otros' }
    ],
    []
  );

  const { user: userOfMember = {}, isRequesting } = useUserByMemberIdEffect(local.member.id);

  useEffect(() => {
    setHasUser(Object.keys(userOfMember).length);
  }, [userOfMember, setHasUser]);

  const {
    localDescription: { localType = '', localName, localTelephone, description },
    showLocal
  } = local;

  return isRequesting ? (
    <Loader />
  ) : (
    <>
      <SelectInputForm
        id="localType"
        label="Tipo de local"
        placeholder="Tipo"
        name="localType"
        control={control}
        value={selectOptions.filter(x => x.value === localType)[0]}
        onChange={handleLocalDescriptionChange}
        errors={errors}
        options={selectOptions}
        errorMessage="Debe seleccionar un tipo de local"
      />
      <Row form>
        <Col>
          <InputForm
            id="localName"
            name="localName"
            label="Nombre del local"
            placeholder="Nombre..."
            value={localName}
            onChange={handleLocalDescriptionChange}
            className="input-spin-none"
            innerRef={register({
              required: 'Campo obligatorio',
              validate: {
                whitespacesValidation
              },
              minLength: {
                value: 6,
                message: 'Nombre del local debe ser de al menos 10 caracteres'
              },
              maxLength: {
                value: 60,
                message: 'El nombre del local no puede tener mas de  60 caracteres'
              },
              pattern: {
                value: noNumbersPattern,
                message: 'No se permiten numeros ni caracteres especiales'
              }
            })}
            errors={errors}
          />
        </Col>
        <Col>
          <InputForm
            label="Número de teléfono*"
            placeholder="0000-0000"
            type="number"
            value={localTelephone}
            id="localTelephone"
            name="localTelephone"
            onChange={handleLocalDescriptionChange}
            innerRef={register({
              required: 'campo obligatorio',
              pattern: {
                value: phoneRegexPattern,
                message: 'Número de teléfono inválido'
              }
            })}
            errors={errors}
          />
        </Col>
      </Row>
      <InputForm
        type="textarea"
        id="description"
        label="Descripción"
        name="description"
        rows="4"
        value={description}
        onChange={handleLocalDescriptionChange}
        style={{ resize: 'none' }}
        innerRef={register({
          required: 'Campo obligatorio',
          validate: {
            whitespacesValidation
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
          id="showLocal"
          name="showLocal"
          label="Mostrar el local en la página"
          checked={showLocal}
          onChange={handleLocalChange}
          errors={errors}
        />
      </Col>
    </>
  );
};

export default React.memo(LocalForm);
