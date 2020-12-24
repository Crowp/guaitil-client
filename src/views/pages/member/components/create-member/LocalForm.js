import React, { useContext } from 'react';
import Select from 'react-select';
import WizardInput from '../../../../components/WizardInput';
import { Col, Row } from 'reactstrap';
import { LocalContext, UserContext } from '../../../../context';
import { LocalEnum } from '../../../../../constants';

const LocalForm = ({ register, errors, watch }) => {
  const { local, handleInputChangeLocal } = useContext(LocalContext);
  const { user, handleInputChangeUser } = useContext(UserContext);
  const { localType = '' } = local;
  const selectOptions = [
    { value: LocalEnum.Kitchen, label: 'Cocina' },
    { value: LocalEnum.Workshop, label: 'Taller' },
    { value: LocalEnum.Lodging, label: 'Alojamiento' },
    { value: LocalEnum.Others, label: 'Otros' }
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
              required: 'Debe especificar contraseña',
              minLength: {
                value: 5,
                message: 'La contraseña debe de tener mínimo 5 caracteres'
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
              validate: value => value === watch('password') || 'La contraseña no coincide'
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
          required: 'Seleccione un género'
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
                message: 'Debe ser de al menos 2 caracteres'
              }
            })}
            errors={errors}
          />
        </Col>
        <Col>
          <WizardInput
            label="Número de teléfono*"
            placeholder="Teléfono"
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
                message: 'EL número de teléfono debe ser de al menos de 8 caracteres'
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

export default React.memo(LocalForm);
