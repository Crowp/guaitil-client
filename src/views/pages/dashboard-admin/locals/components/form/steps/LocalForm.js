import React, { useContext, useMemo, useEffect } from 'react';
import { Col, Row } from 'reactstrap';
import Loader from '@/template/components/common/Loader';
import { LocalContext, UserContext } from '../../../../../../context';
import { LocalEnum, LocalStateEnum } from '@/constants';
import { useUserByMemberIdEffect } from '../../../../../../hooks';
import { SelectInputForm, InputForm } from '../../../../../../components/forms/inputs';

const LocalForm = ({ register, errors, watch, isUpdate }) => {
  const { local, handleInputLocalChange, hasUser, setHasUser } = useContext(LocalContext);
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
  const selectOptionsState = useMemo(
    () => [{ value: LocalStateEnum.Active, label: 'Activo' }, { value: LocalStateEnum.Disable, label: 'Desactivado' }],
    []
  );

  const { user: userOfMember, isRequesting } = useUserByMemberIdEffect(local.member.memberId);

  useEffect(() => {
    setHasUser(!!userOfMember);
  }, [userOfMember, setHasUser]);

  const { localType = '', name, telephone, description, state = true } = local;
  console.log(state);

  const { password, confirmPassword = '' } = user;

  return isRequesting ? (
    <Loader />
  ) : (
    <>
      {!hasUser ||
        (isUpdate && (
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
        ))}
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
      <SelectInputForm
        id="state"
        label="Estado"
        placeholder="Estado"
        name="state"
        value={selectOptions.filter(x => x.value === state)[0]}
        onChange={handleInputLocalChange}
        errors={errors}
        options={selectOptionsState}
        required
        innerRef={register({
          required: 'Seleccione el estado del local'
        })}
      />
      <Row form>
        <Col>
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
        <Col>
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
      </Row>
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
    </>
  );
};

export default React.memo(LocalForm);
