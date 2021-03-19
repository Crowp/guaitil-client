import React, { useContext } from 'react';
import { Col, Row } from 'reactstrap';
import Select from 'react-select';
import InputMask from 'react-input-mask';

import { ReservationContext } from '../../../../../../context';
import { GenderEnum } from '../../../../../../../constants';
import { SelectInputForm, InputForm } from '../../../../../../components/forms/inputs';

import {
  dniRegexPattern,
  emailRegexPattern,
  phoneRegexPattern,
  whitespacesValidation,
  aCharacterValidation
} from '../../../../../../components/forms/inputs/validations';

const PersonForm = ({ register, errors, control }) => {
  const { reservation, handleInputChangeReservation } = useContext(ReservationContext);
  const { person } = reservation;

  const { email, firstLastName, id, name, secondLastName, telephone, gender } = person;

  const selectOptions = [{ value: GenderEnum.Male, label: 'Hombre' }, { value: GenderEnum.Female, label: 'Mujer' }];

  const onChangePerson = ({ name, value }) => {
    handleInputChangeReservation({ name: 'person', value: { ...reservation.person, [name]: value } });
  };

  return (
    <>
      <InputForm
        label="Nombre"
        placeholder="Luis"
        name="name"
        id="name"
        value={name}
        onChange={onChangePerson}
        innerRef={register({
          ...defaultInnerRef
        })}
        errors={errors}
      />
      <Row form>
        <Col>
          <InputForm
            label="Primer Apellido*"
            placeholder="Morales"
            id="firstLastName"
            name="firstLastName"
            value={firstLastName}
            onChange={onChangePerson}
            innerRef={register({
              ...defaultInnerRef
            })}
            errors={errors}
          />
        </Col>
        <Col>
          <InputForm
            label="Segundo Apellido"
            placeholder="Morataya"
            id="secondLastName"
            name="secondLastName"
            value={secondLastName}
            onChange={onChangePerson}
            innerRef={register({
              ...defaultInnerRef
            })}
            errors={errors}
          />
        </Col>
      </Row>
      <InputForm
        label="Cédula*"
        placeholder="901110534"
        id="id"
        name="id"
        value={id}
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
      <InputForm
        label="Correo Electrónico*"
        placeholder="Correo Electrónico"
        id="email"
        name="email"
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
      <Row form>
        <Col>
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
        <Col>
          <SelectInputForm
            type="select"
            label="Género"
            placeholder="Género"
            tag={Select}
            name="gender"
            id="gender"
            control={control}
            value={selectOptions.filter(x => x.value === gender)[0]}
            onChange={onChangePerson}
            options={selectOptions}
            errorMessage="Seleccione el género"
            errors={errors}
          />
        </Col>
      </Row>
    </>
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

export default React.memo(PersonForm);
