import React, { useContext } from 'react';
import { Col, Row } from 'reactstrap';
import Select from 'react-select';

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

  const selectOptions = [
    { value: GenderEnum.Male, label: 'Hombre' },
    { value: GenderEnum.Female, label: 'Mujer' },
    { value: GenderEnum.Other, label: 'Prefiero no especificar' }
  ];

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
          validate: {
            whitespacesValidation,
            aCharacterValidation
          },
          minLength: {
            value: 3,
            message: 'El nombre debe ser mínimo de 3 caracteres'
          },
          maxLength: {
            value: 40,
            message: 'El nombre no puede tener mas de 40 caracteres'
          }
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
              required: 'Campo obligatorio',
              validate: {
                whitespacesValidation,
                aCharacterValidation
              },
              minLength: {
                value: 3,
                message: 'El apellido debe ser mínimo de 3 caracteres'
              },
              maxLength: {
                value: 60,
                message: 'El apellido no puede tener mas de 60 caracteres'
              }
            })}
            errors={errors}
          />
        </Col>
        <Col>
          <InputForm
            id="secondLastName"
            name="secondLastName"
            label="Segundo Apellido(opcional)"
            placeholder="Baltodano"
            value={secondLastName}
            onChange={onChangePerson}
            innerRef={register({
              validate: !secondLastName === '' && {
                whitespacesValidation,
                aCharacterValidation
              },
              required: 'Campo obligatorio',
              minLength: {
                value: 3,
                message: 'El apellido debe ser mínimo de 3 caracteres'
              },
              maxLength: {
                value: 60,
                message: 'El apellido no puede tener mas de 60 caracteres'
              }
            })}
            errors={errors}
          />
        </Col>
      </Row>
      <InputForm
        label="Cédula*"
        placeholder="901110534"
        type="number"
        id="id"
        name="id"
        value={id}
        maxLength="9"
        onChange={onChangePerson}
        innerRef={register({
          required: 'Campo obligatorio',
          pattern: {
            value: dniRegexPattern,
            message: 'Número de cédula invalido'
          },
          validate: {
            whitespacesValidation,
            aCharacterValidation
          },
          minLength: {
            value: 9,
            message: 'La cédula debe ser de al menos 9 caracteres'
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
            type="number"
            name="telephone"
            label="Número de teléfono"
            placeholder="0000-0000"
            value={telephone}
            onChange={onChangePerson}
            innerRef={register({
              required: 'Campo obligatorio',
              validate: {
                whitespacesValidation,
                aCharacterValidation
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

export default React.memo(PersonForm);
