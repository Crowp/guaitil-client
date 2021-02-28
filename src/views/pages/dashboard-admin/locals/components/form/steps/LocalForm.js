import React, { useContext, useMemo, useEffect } from 'react';
import { Col, Row } from 'reactstrap';
import Loader from '@/template/components/common/Loader';
import { LocalEnum } from '@/constants';
import { useUserByMemberIdEffect } from '../../../../../../hooks';
import { SelectInputForm, InputForm, CheckboxInputForm } from '../../../../../../components/forms/inputs';
import { LocalContext } from '../../../../../../context';

const LocalForm = ({ register, errors, watch, isUpdate }) => {
  const { local, user, hasUser, setHasUser, handleUserChange, handleLocalChange } = useContext(LocalContext);

  const selectOptions = useMemo(
    () => [
      { value: LocalEnum.Kitchen, label: 'Cocina' },
      { value: LocalEnum.Workshop, label: 'Taller' },
      { value: LocalEnum.Lodging, label: 'Alojamiento' },
      { value: LocalEnum.Others, label: 'Otros' }
    ],
    []
  );

  const { user: userOfMember, isRequesting } = useUserByMemberIdEffect(local.member.memberId);

  useEffect(() => {
    setHasUser(!userOfMember);
  }, [userOfMember, setHasUser]);

  const { localType = '', localName, localTelephone, description, state } = local;
  const { password, confirmPassword = '' } = user;

  return isRequesting ? (
    <Loader />
  ) : (
    <>
      {(!hasUser || isUpdate) && (
        <Row form>
          <Col>
            <InputForm
              id="password"
              type="password"
              name="password"
              label="Contraseña*"
              value={password}
              placeholder="Contraseña..."
              autoComplete="off"
              onChange={handleUserChange}
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
          <Col>
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
        </Row>
      )}
      <SelectInputForm
        id="localType"
        label="Tipo de local"
        placeholder="Tipo"
        name="localType"
        value={selectOptions.filter(x => x.value === localType)[0]}
        onChange={handleLocalChange}
        errors={errors}
        options={selectOptions}
        required
        innerRef={register({
          required: 'Seleccione un tipo de local'
        })}
      />
      <Row form>
        <Col>
          <InputForm
            id="localName"
            name="localName"
            label="Nombre del local"
            placeholder="Nombre..."
            value={localName}
            onChange={handleLocalChange}
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
            label="Número de telefono*"
            placeholder="Telefono"
            value={localTelephone}
            id="localTelephone"
            name="localTelephone"
            onChange={handleLocalChange}
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
      </Row>
      <InputForm
        type="textarea"
        label="Descripción"
        name="description"
        rows="4"
        value={description}
        onChange={handleLocalChange}
        style={{ resize: 'none' }}
        id="description"
        innerRef={register({
          required: 'Campo obligatorio'
        })}
        errors={errors}
      />
      <Col xs={6}>
        <CheckboxInputForm
          id="state"
          name="state"
          label="Mostrar el local en pagina"
          checked={state}
          onChange={handleLocalChange}
          errors={errors}
        />
      </Col>
    </>
  );
};

export default React.memo(LocalForm);
