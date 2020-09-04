import React, { useContext } from 'react';
import WizardInput from '../../components/WizardInput';
import { Col, Row } from 'reactstrap';
import Select from 'react-select';
import { ReservationContext } from '../../context';
import { GenderEnum } from '../../../constants';

const PersonForm = ({ register, errors }) => {
  const { reservation, handleInputChangeReservation } = useContext(ReservationContext);
  const { gender = '' } = reservation;

  const selectOptions = [{ value: GenderEnum.Male, label: 'Hombre' }, { value: GenderEnum.Female, label: 'Mujer' }];

  const onChangePerson = (name, value) => {
    handleInputChangeReservation({ name: 'person', value: { ...reservation.person, [name]: value } });
  };

  return (
    <>
      <WizardInput
        label="Nombre"
        placeholder="Luis"
        name="name"
        id="name"
        value={reservation['person']}
        onChange={({ target: { name, value } }) => {
          onChangePerson(name, value);
        }}
        innerRef={register({
          required: 'Campo obligatorio',
          minLength: {
            value: 2,
            message: 'Min length 2'
          }
        })}
        errors={errors}
      />
      <Row form>
        <Col>
          <WizardInput
            label="Primer Apellido*"
            placeholder="Morales"
            id="firstLastName"
            name="firstLastName"
            value={reservation['person']}
            onChange={({ target: { name, value } }) => {
              onChangePerson(name, value);
            }}
            innerRef={register({
              required: 'Campo obligatorio',
              minLength: {
                value: 2,
                message: 'Password must have at least 2 characters'
              }
            })}
            errors={errors}
          />
        </Col>
        <Col>
          <WizardInput
            label="Segundo Apellido"
            placeholder="Morataya"
            id="secondLastName"
            name="secondLastName"
            value={reservation['person']}
            onChange={({ target: { name, value } }) => {
              onChangePerson(name, value);
            }}
            innerRef={register({
              required: 'Campo obligatorio',
              minLength: {
                value: 2,
                message: 'Password must have at least 2 characters'
              }
            })}
            errors={errors}
          />
        </Col>
      </Row>
      <WizardInput
        label="Cedula*"
        placeholder="901110534"
        id="id"
        name="id"
        value={reservation['person']}
        onChange={({ target: { name, value } }) => {
          onChangePerson(name, value);
        }}
        innerRef={register({
          required: 'Campo obligatorio',
          minLength: {
            value: 8,
            maximum: 12,
            message: 'La cedula debe tener entre 8 y 12 caracteres'
          }
        })}
        errors={errors}
      />
      <WizardInput
        label="Email*"
        placeholder="Email"
        id="email"
        name="email"
        value={reservation['person']}
        onChange={({ target: { name, value } }) => {
          onChangePerson(name, value);
        }}
        innerRef={register({
          required: 'Campo obligatorio',
          pattern: {
            value: /[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})/i,
            message: 'Email debe ser valido'
          }
        })}
        errors={errors}
      />
      <Row form>
        <Col>
          <WizardInput
            label="Número de telefono*"
            placeholder="Telefono"
            id="telephone"
            name="telephone"
            value={reservation['person']}
            onChange={({ target: { name, value } }) => {
              onChangePerson(name, value);
            }}
            innerRef={register({
              required: 'Campo obligatorio',
              minLength: {
                value: 8,
                message: 'EL número de telefono debe ser de al menos de 8 caracteres'
              }
            })}
            errors={errors}
          />
        </Col>
        <Col>
          <WizardInput
            type="select"
            label="Género"
            placeholder="Género"
            tag={Select}
            name="gender"
            id="gender"
            value={selectOptions.filter(x => x.value === gender)[0]}
            onChange={({ value }) => {
              onChangePerson('gender', value);
            }}
            innerRef={register({
              required: 'Seleccione un genero'
            })}
            errors={errors}
            options={selectOptions}
          />
        </Col>
      </Row>
    </>
  );
};

export default PersonForm;
