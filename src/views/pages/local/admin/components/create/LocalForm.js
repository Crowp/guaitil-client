import React, { useContext, useEffect } from 'react';
import Select from 'react-select';
import WizardInput from '../../../../../components/WizardInput';
import { Col, Row, Spinner } from 'reactstrap';
import { isIterableArray } from '../../../../../../template/helpers/utils';
import { LocalContext, UserContext } from '../../../../../context';
import { LocalEnum } from '../../../../../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { selectRequesting } from '../../../../../../selectors/requesting/RequestingSelector';
import UserAction from '../../../../../../stores/user/UserAction';

const LocalForm = ({ register, errors, watch, hasUser, setHasUser }) => {
  const dispatch = useDispatch();
  const { local, handleInputChangeLocal } = useContext(LocalContext);
  const { user, handleInputChangeUser } = useContext(UserContext);

  const { localType = '', member } = local;
  const selectOptions = [
    { value: LocalEnum.Kitchen, label: 'Cocina' },
    { value: LocalEnum.Workshop, label: 'Taller' },
    { value: LocalEnum.Lodging, label: 'Alojamiento' },
    { value: LocalEnum.Others, label: 'Otros' }
  ];

  const users = useSelector(state => state.users);
  const isRequesting = useSelector(state => selectRequesting(state, [UserAction.REQUEST_USER]));

  useEffect(() => {
    dispatch(UserAction.getUsers());
  }, [dispatch]);

  useEffect(() => {
    if (isIterableArray(users)) {
      const [user] = users.filter(user => user.member.id === member.id);
      if (user) {
        setHasUser(true);
      }
    }
  }, [users, member.id, setHasUser]);

  return isRequesting ? (
    <Row className="h-100">
      <Col className="d-flex justify-content-center align-items-center">
        <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" color="primary" />
      </Col>
    </Row>
  ) : (
    <>
      {!hasUser && (
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
      )}
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

export default React.memo(LocalForm);
