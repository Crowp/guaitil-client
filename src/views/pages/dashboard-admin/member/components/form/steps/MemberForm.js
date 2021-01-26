import React, { useContext, useMemo, useState } from 'react';
import { Col, Row } from 'reactstrap';

import { MemberContext } from '../../../../../../context';
import { GenderEnum, MemberEnum } from '../../../../../../../constants';

import {
  SelectInputForm,
  InputForm,
  DatetimeInputForm,
  CheckboxInputForm
} from '../../../../../../components/forms/inputs';

const MemberForm = ({ register, errors }) => {
  const { member, hasLocal, setHasLocal, handleInputMemberChange } = useContext(MemberContext);

  const {
    id,
    email,
    gender = '',
    memberType,
    occupation,
    createdAt,
    telephone,
    name,
    firstLastName,
    secondLastName
  } = member;

  const selectGenderOptions = useMemo(
    () => [{ value: GenderEnum.Male, label: 'Hombre' }, { value: GenderEnum.Female, label: 'Mujer' }],
    []
  );

  const onChangePerson = ({ name, value }) => {
    handleInputMemberChange({ name: 'person', value: { ...member.person, [name]: value } });
  };

  const onMemberTypeCheckChange = ({ value: isAssociated, name }) => {
    if (!isAssociated && !hasLocal) {
      setHasLocal(true);
    }
    handleInputMemberChange({ name, value: isAssociated ? MemberEnum.Associated : MemberEnum.Regular });
  };

  const onMemberHasLocalChange = ({ value }) => {
    setHasLocal(value);
  };
  console.log(errors);

  const isAssociated = memberType === MemberEnum.Associated;
  return (
    <>
      <InputForm
        id="name"
        name="name"
        label="Nombre del local"
        placeholder="Nombre..."
        value={name}
        onChange={onChangePerson}
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
      <Row form>
        <Col>
          <InputForm
            id="firstLastName"
            name="firstLastName"
            label="Primer Apellido"
            placeholder="Morataya"
            value={firstLastName}
            onChange={onChangePerson}
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
        <Col>
          <InputForm
            id="firstLastName"
            name="firstLastName"
            label="Segundo Apellido"
            placeholder="Baltodano"
            value={secondLastName}
            onChange={onChangePerson}
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
      </Row>
      <InputForm
        id="id"
        name="id"
        label="Cédula"
        placeholder="501110222"
        value={id}
        onChange={onChangePerson}
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
      <InputForm
        id="email"
        name="email"
        label="Correo Electrónico"
        placeholder="Correo Electrónico"
        value={email}
        onChange={handleInputMemberChange}
        className="input-spin-none"
        innerRef={register({
          required: 'Campo obligatorio',
          pattern: {
            value: /[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})/i,
            message: 'El Email debe ser valido'
          }
        })}
        errors={errors}
      />
      <InputForm
        id="telephone"
        name="telephone"
        label="Correo Electrónico"
        placeholder="Correo Electrónico"
        value={telephone}
        onChange={onChangePerson}
        className="input-spin-none"
        innerRef={register({
          required: 'Campo obligatorio',
          minLength: {
            value: 8,
            message: 'EL número de teléfono debe ser de al menos de 8 caracteres'
          }
        })}
        errors={errors}
      />
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
      <Row form>
        <Col>
          <DatetimeInputForm
            id="createdAt"
            name="createdAt"
            label="Fecha de inscripción"
            value={createdAt}
            onChange={handleInputMemberChange}
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
        <Col>
          <InputForm
            id="occupation"
            name="occupation"
            label="Ocupación"
            placeholder="Trabaja en..."
            value={occupation}
            onChange={handleInputMemberChange}
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
      </Row>
      <Row form>
        <Col>
          <CheckboxInputForm
            id="memberType"
            name="memberType"
            label="Es un asociado"
            checked={isAssociated}
            onChange={onMemberTypeCheckChange}
            errors={errors}
          />
        </Col>
        <Col>
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
    </>
  );
};

export default React.memo(MemberForm);
