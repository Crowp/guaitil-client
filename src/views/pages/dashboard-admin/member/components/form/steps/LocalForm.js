import React, { useContext, useMemo } from 'react';
import { Col, Row } from 'reactstrap';
import { LocalContext, UserContext } from '../../../../../../context';
import { LocalEnum } from '@/constants';
import { SelectInputForm, InputForm } from '../../../../../../components/forms/inputs';

const LocalForm = ({ register, errors, watch, isUpdate }) => {
  const { local, handleInputLocalChange } = useContext(LocalContext);
  const { user, handleInputUserChange } = useContext(UserContext);

  const selectOptions = useMemo(
    () => [
      { value: LocalEnum.Kitchen, label: 'Cocina' },
      { value: LocalEnum.Workshop, label: 'Taller' },
      { value: LocalEnum.Lodging, label: 'Alojamiento' },
      { value: LocalEnum.Others, label: 'Otros' }
    ],
    []
  );

  const { localType = '', name, telephone, description } = local;

  const { password, confirmPassword = '' } = user;

  return (
    <Row form>
      <Col xs={6}>
        <InputForm
          id="password"
          type="password"
          name="password"
          label="Contraseña*"
          value={password}
          placeholder="Contraseña..."
          autoComplete="off"
          onChange={handleInputUserChange}
          errors={errors}
          innerRef={register({
            required: isUpdate ? false : 'Debe especificar contraseña',
            minLength: {
              value: 2,
              message: 'Debe ser de al menos 2 caracteres'
            }
          })}
        />
      </Col>
      <Col xs={6}>
        <InputForm
          type="password"
          label="Confirmar Contraseña*"
          placeholder="Repetir"
          id="confirmPassword"
          autoComplete="on"
          value={confirmPassword}
          name="confirmPassword"
          errors={errors}
          innerRef={register({
            validate: value => value === watch('password') || 'La contraseña no coincide'
          })}
        />
      </Col>
      <Col xs={12}>
        <SelectInputForm
          id="localType"
          label="Tipo de local"
          placeholder="Tipo"
          name="localType"
          value={selectOptions.filter(x => x.value === localType)[0]}
          onChange={handleInputLocalChange}
          errors={errors}
          options={selectOptions}
          required
          innerRef={register({
            required: 'Seleccione un tipo de local'
          })}
        />
      </Col>
      <Col xs={6}>
        <InputForm
          id="name"
          name="name"
          label="Nombre del local"
          placeholder="Nombre..."
          value={name}
          onChange={handleInputLocalChange}
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
      <Col xs={6}>
        <InputForm
          label="Número de telefono*"
          placeholder="Telefono"
          value={telephone}
          id="telephone"
          name="telephone"
          onChange={handleInputLocalChange}
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
      <Col xs={12}>
        <InputForm
          type="textarea"
          label="Descripción"
          name="description"
          rows="4"
          value={description}
          onChange={handleInputLocalChange}
          style={{ resize: 'none' }}
          id="description"
          innerRef={register({
            required: 'Campo obligatorio'
          })}
          errors={errors}
        />
      </Col>
    </Row>
  );
};

export default React.memo(LocalForm);
