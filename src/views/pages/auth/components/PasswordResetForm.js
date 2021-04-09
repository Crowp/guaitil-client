import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, DropdownItem, Form, FormGroup, Input, Label, Row, Spinner } from 'reactstrap';
import AuthService from '../../../../services/AuthService';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import UserAction from '../../../../stores/user/UserAction';
import { useIsRequesting } from '../../../hooks';
import { RouteMap } from '../../../../constants';
import { useForm } from 'react-hook-form';
import { InputForm } from '../../../components/forms/inputs';
import { Link } from 'react-router-dom';
import AuthAction from '../../../../stores/auth/AuthAction';

const PasswordResetForm = ({ idUser }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [state, setState] = useState({ password: '', confirmPassword: '' });
  const [isDisabled, setIsDisabled] = useState(true);

  const { register, handleSubmit, errors, watch } = useForm();

  const { password, confirmPassword } = state;
  const handleInputChange = ({ name, value }) => {
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const isRequesting = useIsRequesting([UserAction.REQUEST_USER_UPDATE_PASSWORD]);
  // Handler
  const onHandleSubmit = () => {
    dispatch(
      UserAction.updateUserPassword(idUser, password, ok => {
        if (ok) {
          dispatch(AuthAction.logout());
          history.push(RouteMap.Auth.login());
        }
      })
    );
  };

  useEffect(() => {
    if (confirmPassword === password && !!password && !!confirmPassword) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [confirmPassword, password]);

  return (
    <Form onSubmit={handleSubmit(onHandleSubmit)}>
      <InputForm
        id="password"
        type="password"
        name="password"
        label="Contraseña*"
        value={password}
        placeholder="Contraseña..."
        autoComplete="off"
        onChange={handleInputChange}
        errors={errors}
        innerRef={register({
          required: 'Debe especificar la contraseña',
          minLength: {
            value: 8,
            message: 'Debe ser de al menos 8 caracteres'
          }
        })}
      />
      <InputForm
        type="password"
        label="Confirmar Contraseña*"
        placeholder="Repetir"
        id="confirmPassword"
        autoComplete="on"
        value={confirmPassword}
        onChange={handleInputChange}
        name="confirmPassword"
        errors={errors}
        innerRef={register({
          required: 'Campo obligatorio',
          validate: value => value === watch('password') || 'La contraseña no coincide'
        })}
      />
      <Button color="warning" block className="mt-3" disabled={isDisabled || isRequesting}>
        {isRequesting ? <Spinner size="sm" color="light" /> : 'Guardar nueva contraseña'}
      </Button>
      <Row>
        <Col className="d-flex justify-content-center mt-3">
          <Link className="fs--1" onClick={() => dispatch(AuthAction.logout())} to={RouteMap.Auth.login()}>
            Iniciar Sesión con otra cuenta
          </Link>
        </Col>
      </Row>
    </Form>
  );
};

PasswordResetForm.propTypes = {
  layout: PropTypes.string,
  hasLabel: PropTypes.bool
};

PasswordResetForm.defaultProps = {
  layout: 'basic',
  hasLabel: false
};

export default PasswordResetForm;
