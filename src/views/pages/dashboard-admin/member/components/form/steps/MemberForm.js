import React, { useContext, useMemo } from 'react';
import { Col, Row } from 'reactstrap';
import moment from 'moment';

import { MemberContext } from '../../../../../../context';
import { GenderEnum, MemberEnum } from '../../../../../../../constants';
import {
  SelectInputForm,
  InputForm,
  DatetimeInputForm,
  CheckboxInputForm
} from '../../../../../../components/forms/inputs';

import {
  dniRegexPattern,
  emailRegexPattern,
  phoneRegexPattern,
  whitespacesValidation,
  noNumbersPattern,
  onlyLettersPattern
} from '../../../../../../components/forms/inputs/validations';
import { disableNextDt } from '../../../../../../components/date/handleDisableDate';

const MemberForm = ({ register, errors, isUpdate, control }) => {
  const { member, hasLocal, setHasLocal, handleMemberChange } = useContext(MemberContext);

  const { memberType, occupation, affiliationDate, person } = member;

  const { name, firstLastName, secondLastName, id, gender, telephone, email } = person;

  const selectGenderOptions = useMemo(
    () => [
      { value: GenderEnum.Male, label: 'Hombre' },
      { value: GenderEnum.Female, label: 'Mujer' },
      { value: GenderEnum.Other, label: 'Prefiero no especificar' }
    ],
    []
  );
  const selectDate = moment(affiliationDate);
  const onChangePerson = ({ name, value }) => {
    handleMemberChange({ name: 'person', value: { ...member.person, [name]: value } });
  };

  const onMemberTypeCheckChange = ({ value: isAssociated, name }) => {
    if (!isAssociated && !hasLocal) {
      setHasLocal(true);
    }
    handleMemberChange({ name, value: isAssociated ? MemberEnum.Associated : MemberEnum.Regular });
  };

  const onMemberHasLocalChange = ({ value }) => {
    setHasLocal(value);
  };

  const isAssociated = memberType === MemberEnum.Associated;
  return (
    <Row form>
      <Col xs={12} lg={4}>
        <InputForm
          id="name"
          name="name"
          label="Nombre"
          placeholder="Nombre..."
          value={name}
          onChange={onChangePerson}
          innerRef={register({
            required: 'Campo obligatorio',
            validate: {
              whitespacesValidation,
              onlyLettersPattern
            },
            minLength: {
              value: 3,
              message: 'El nombre debe ser mínimo de 3 caracteres'
            },
            maxLength: {
              value: 40,
              message: 'El nombre no puede tener mas de 40 caracteres'
            },
            pattern: {
              value: onlyLettersPattern,
              message: 'No se permiten numeros ni caracteres especiales'
            }
          })}
          errors={errors}
        />
      </Col>
      <Col xs={6} lg={4}>
        <InputForm
          id="firstLastName"
          name="firstLastName"
          label="Primer Apellido"
          placeholder="Morataya"
          value={firstLastName}
          onChange={onChangePerson}
          innerRef={register({
            required: 'Campo obligatorio',
            validate: {
              whitespacesValidation
            },
            minLength: {
              value: 3,
              message: 'El apellido debe ser mínimo de 3 caracteres'
            },
            maxLength: {
              value: 60,
              message: 'El apellido no puede tener mas de 60 caracteres'
            },
            pattern: {
              value: onlyLettersPattern,
              message: 'No se permiten numeros ni caracteres especiales'
            }
          })}
          errors={errors}
        />
      </Col>
      <Col xs={6} lg={4}>
        <InputForm
          id="secondLastName"
          name="secondLastName"
          label="Segundo Apellido(opcional)"
          placeholder="Baltodano"
          value={secondLastName}
          onChange={onChangePerson}
          innerRef={register({
            validate: !secondLastName === '' && {
              whitespacesValidation
            },
            minLength: {
              value: 3,
              message: 'El apellido debe ser mínimo de 3 caracteres'
            },
            maxLength: {
              value: 60,
              message: 'El apellido no puede tener mas de 60 caracteres'
            },
            pattern: {
              value: onlyLettersPattern,
              message: 'No se permiten numeros ni caracteres especiales'
            }
          })}
          errors={errors}
        />
      </Col>
      <Col xs={12} lg={6}>
        <InputForm
          id="id"
          name="id"
          label="Cédula"
          type="number"
          placeholder="501110222"
          value={id}
          maxLength="9"
          onChange={onChangePerson}
          innerRef={register({
            ...defaultInnerRef,
            pattern: {
              value: dniRegexPattern,
              message: 'Número de cédula invalido'
            }
          })}
          errors={errors}
        />
      </Col>
      <Col xs={12} lg={6}>
        <InputForm
          id="email"
          name="email"
          label="Correo Electrónico"
          placeholder="Correo Electrónico"
          value={email}
          onChange={onChangePerson}
          innerRef={register({
            required: 'Campo obligatorio',
            validate: {
              whitespacesValidation
            },
            minLength: {
              value: 13,
              message: 'Email debe ser de al menos 6 caracteres'
            },
            maxLength: {
              value: 255,
              message: 'Email no puede tener mas de 100 caracteres'
            },
            pattern: {
              value: emailRegexPattern,
              message: 'El Email debe ser valido'
            }
          })}
          errors={errors}
        />
      </Col>
      <Col xs={12} lg={6} style={{ position: 'relative', zIndex: 20 }}>
        <SelectInputForm
          type="select"
          id="gender"
          label="Género"
          placeholder="Seleccione el género"
          name="gender"
          control={control}
          value={selectGenderOptions.filter(x => x.value === gender)[0]}
          onChange={onChangePerson}
          errors={errors}
          options={selectGenderOptions}
          errorMessage="Seleccione el género"
        />
      </Col>
      <Col xs={12} lg={6}>
        <InputForm
          id="telephone"
          name="telephone"
          type="number"
          label="Número de teléfono"
          placeholder="0000-0000"
          value={telephone}
          onChange={onChangePerson}
          innerRef={register({
            required: 'Campo obligatorio',
            validate: {
              whitespacesValidation
            },
            minLength: {
              value: 8,
              message: 'Debe ser de al menos 8 números'
            },
            pattern: {
              value: phoneRegexPattern,
              message: 'Número de telefono inválido'
            }
          })}
          errors={errors}
        />
      </Col>
      <Col xs={6}>
        <DatetimeInputForm
          id="affiliationDate"
          name="affiliationDate"
          label="Fecha de afiliación"
          isValidDate={disableNextDt}
          value={selectDate}
          onChange={handleMemberChange}
          autocomplete="off"
          innerRef={register({
            ...defaultInnerRef
          })}
          errors={errors}
        />
      </Col>
      <Col xs={6}>
        <InputForm
          id="occupation"
          name="occupation"
          label="Ocupación"
          placeholder="Trabaja en..."
          value={occupation}
          onChange={handleMemberChange}
          innerRef={register({
            required: 'Campo obligatorio',
            validate: {
              whitespacesValidation
            },
            minLength: {
              value: 6,
              message: 'La ocupación debe ser de al menos 6 caracteres'
            },
            maxLength: {
              value: 60,
              message: 'La ocupación no puede tener mas de 100 caracteres'
            },
            pattern: {
              value: noNumbersPattern,
              message: 'No se permiten numeros ni caracteres especiales'
            }
          })}
          errors={errors}
        />
      </Col>
      {!isUpdate && (
        <>
          <Col xs={6}>
            <CheckboxInputForm
              id="memberType"
              name="memberType"
              label="Es un asociado"
              checked={isAssociated}
              onChange={onMemberTypeCheckChange}
              errors={errors}
            />
          </Col>
          <Col xs={6}>
            <CheckboxInputForm
              id="hasLocal"
              name="hasLocal"
              label="Tiene un local"
              disabled={!isAssociated}
              checked={hasLocal}
              onChange={onMemberHasLocalChange}
              errors={errors}
            />
          </Col>
        </>
      )}
    </Row>
  );
};

const defaultInnerRef = {
  required: 'Campo obligatorio',
  validate: {
    whitespacesValidation
  },
  minLength: {
    value: 2,
    message: 'Debe ser de al menos 2 caracteres'
  }
};

export default React.memo(MemberForm);
