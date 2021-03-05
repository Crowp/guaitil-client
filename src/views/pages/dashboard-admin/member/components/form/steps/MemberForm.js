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
import { disableNextDt } from '../../../../../../components/date/handleDisableDate';

const MemberForm = ({ register, errors }) => {
  const { member, hasLocal, setHasLocal, handleMemberChange } = useContext(MemberContext);

  const { memberType, occupation, affiliationDate, person } = member;

  const { name, firstLastName, secondLastName, id, gender, telephone, email } = person;

  const selectGenderOptions = useMemo(
    () => [{ value: GenderEnum.Male, label: 'Hombre' }, { value: GenderEnum.Female, label: 'Mujer' }],
    []
  );
  const selectDate = moment(affiliationDate, 'yyyy-MM-dd HH:mm').format('yyyy-MM-dd HH:mm');
  console.log(selectDate);
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
            minLength: {
              value: 2,
              message: 'Debe ser de al menos 2 caracteres'
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
            minLength: {
              value: 2,
              message: 'Debe ser de al menos 2 caracteres'
            }
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
            required: 'Campo obligatorio',
            minLength: {
              value: 2,
              message: 'Debe ser de al menos 2 caracteres'
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
          placeholder="501110222"
          value={id}
          onChange={onChangePerson}
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
            pattern: {
              value: /[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})/i,
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
          placeholder="00000000"
          value={telephone}
          onChange={onChangePerson}
          innerRef={register({
            required: 'Campo obligatorio',
            minLength: {
              value: 8,
              message: 'EL número de teléfono debe ser de al menos de 8 caracteres'
            }
          })}
          errors={errors}
        />
      </Col>
      <Col xs={12} lg={6}>
        <SelectInputForm
          type="select"
          label="Género"
          name="gender"
          id="gender"
          placeholder="Seleccione el género"
          value={selectGenderOptions.filter(x => x.value === gender)[0]}
          onChange={onChangePerson}
          errors={errors}
          options={selectGenderOptions}
          innerRef={register({
            required: 'Seleccione el género'
          })}
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
          id="occupation"
          name="occupation"
          label="Ocupación"
          placeholder="Trabaja en..."
          value={occupation}
          onChange={handleMemberChange}
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
    </Row>
  );
};

export default React.memo(MemberForm);
