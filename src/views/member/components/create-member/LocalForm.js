import React, { useContext } from 'react';
import Select from 'react-select';
import WizardInput from '../../../components/WizardInput';
import { Col, Row } from 'reactstrap';
import { LocalContext, UserContext } from '../../../context';

const LocalForm = ({ register, errors, watch }) => {
  const { local, handleInputChangeLocal } = useContext(LocalContext);
  const { user, handleInputChangeUser } = useContext(UserContext);
  const { localType = '' } = local;
  const selectOptions = [
    { value: 'KITCHEN', label: 'Cocina' },
    { value: 'WORKSHOP', label: 'Taller' },
    { value: 'LODGING', label: 'Alojamiento' }
  ];
  return (
    <>
      <Row form>
        <Col>
          <WizardInput
            type="password"
            label="Contraseña*"
            placeholder="Password"
            id="password"
            autoComplete="on"
            name="password"
            value={user}
            onChange={({ target }) => {
              handleInputChangeUser(target);
            }}
            innerRef={register({
              required: 'You must specify a password',
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
            type="password"
            label="Confirmar Contraseña*"
            placeholder="Repetir"
            id="confirmPassword"
            autoComplete="on"
            value={user}
            name="confirmPassword"
            innerRef={register({
              validate: value => value === watch('password') || 'The password do not match'
            })}
            errors={errors}
          />
        </Col>
      </Row>
      <WizardInput
        type="select"
        label="Tipo de local"
        placeholder="Tipo"
        tag={Select}
        name="localType"
        id="localType"
        value={selectOptions.filter(x => x.value === localType)[0]}
        onChange={({ value }) => {
          handleInputChangeLocal({ name: 'localType', value });
        }}
        innerRef={register({
          required: 'Seleccioné un genero'
        })}
        errors={errors}
        options={selectOptions}
      />
      <Row form>
        <Col>
          <WizardInput
            label="Nombre del local"
            placeholder="Nombre..."
            name="name"
            value={local}
            onChange={({ target }) => {
              handleInputChangeLocal(target);
            }}
            id="name"
            className="input-spin-none"
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
            label="Número de telefono*"
            placeholder="Telefono"
            value={local}
            id="telephone"
            name="telephone"
            onChange={({ target }) => {
              handleInputChangeLocal(target);
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
      </Row>
      <WizardInput
        type="textarea"
        label="Descripción"
        name="description"
        rows="4"
        value={local}
        onChange={({ target }) => {
          handleInputChangeLocal(target);
        }}
        style={{ resize: 'none' }}
        id="description"
        innerRef={register({
          required: true
        })}
        errors={errors}
      />
    </>
  );
};

export default LocalForm;
