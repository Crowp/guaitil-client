import React, { useContext } from 'react';
import { Col, Row } from 'reactstrap';
import Select from 'react-select';
import { ReservationContext } from '../../../../../../context';
import { GenderEnum } from '../../../../../../../constants';
import { SelectInputForm, InputForm } from '../../../../../../components/forms/inputs';

const PersonForm = ({ register, errors }) => {
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
            label="Primer Apellido*"
            placeholder="Morales"
            id="firstLastName"
            name="firstLastName"
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
        <Col>
          <InputForm
            label="Segundo Apellido"
            placeholder="Morataya"
            id="secondLastName"
            name="secondLastName"
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
      </Row>
      <InputForm
        label="Cédula*"
        placeholder="901110534"
        id="id"
        name="id"
        value={id}
        onChange={onChangePerson}
        innerRef={register({
          required: 'Campo obligatorio',
          minLength: {
            value: 8,
            maximum: 12,
            message: 'Debe ser entre 8 y 12 caracteres'
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
          <InputForm
            label="Número de télefono*"
            placeholder="Número télefono"
            id="telephone"
            name="telephone"
            value={telephone}
            onChange={onChangePerson}
            innerRef={register({
              required: 'Campo obligatorio',
              minLength: {
                value: 8,
                message: 'Debe ser de al menos de 8 caracteres'
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
            value={selectOptions.filter(x => x.value === gender)[0]}
            onChange={onChangePerson}
            options={selectOptions}
            innerRef={register({
              required: 'Seleccione un género'
            })}
            errors={errors}
          />
        </Col>
      </Row>
    </>
  );
};

export default React.memo(PersonForm);
