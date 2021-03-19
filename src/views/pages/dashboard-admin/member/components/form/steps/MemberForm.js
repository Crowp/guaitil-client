import React, { useContext, useMemo } from 'react';
import { Col, Row } from 'reactstrap';
import moment from 'moment';
import InputMask from 'react-input-mask';

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
  aCharacterValidation
} from '../../../../../../components/forms/inputs/validations';
import { disableNextDt } from '../../../../../../components/date/handleDisableDate';

const MemberForm = ({ register, errors, isUpdate, control }) => {
  const { member, hasLocal, setHasLocal, handleMemberChange } = useContext(MemberContext);

  const { memberType, occupation, affiliationDate, person } = member;

  const { name, firstLastName, secondLastName, id, gender, telephone, email } = person;

  const selectGenderOptions = useMemo(
    () => [{ value: GenderEnum.Male, label: 'Hombre' }, { value: GenderEnum.Female, label: 'Mujer' }],
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
            ...defaultInnerRef
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
            ...defaultInnerRef
          })}
          errors={errors}
        />
      </Col>
      <Col xs={6} lg={4}>
        <InputForm
          id="secondLastName"
          name="secondLastName"
          label="Segundo Apellido"
          placeholder="Baltodano"
          value={secondLastName}
          onChange={onChangePerson}
          innerRef={register({
            ...defaultInnerRef
          })}
          errors={errors}
        />
      </Col>
      <Col xs={12} lg={6}>
        <InputForm
          id="id"
          name="id"
          label="Cédula"
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
            ...defaultInnerRef,
            minLength: false,
            pattern: {
              value: emailRegexPattern,
              message: 'El Email debe ser valido'
            }
          })}
          errors={errors}
        />
      </Col>
      <Col xs={12} lg={6}>
        <InputForm
          id="telephone"
          name="telephone"
          label="Número de teléfono"
          placeholder="0000-0000"
          value={telephone}
          onChange={onChangePerson}
          innerRef={register({
            ...defaultInnerRef,
            pattern: {
              value: phoneRegexPattern,
              message: 'Número de telefono invalido'
            }
          })}
          mask="9999 9999"
          maskChar="-"
          errors={errors}
          tag={InputMask}
        />
      </Col>
      <Col xs={12} lg={6}>
        <SelectInputForm
          type="select"
          label="Género"
          name="gender"
          id="gender"
          control={control}
          placeholder="Seleccione el género"
          value={selectGenderOptions.filter(x => x.value === gender)[0]}
          onChange={onChangePerson}
          errors={errors}
          options={selectGenderOptions}
          errorMessage="Seleccione el género"
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
            ...defaultInnerRef
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
    whitespacesValidation,
    aCharacterValidation
  },
  minLength: {
    value: 2,
    message: 'Debe ser de al menos 2 caracteres'
  }
};

export default React.memo(MemberForm);
