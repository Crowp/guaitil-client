import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Form, Row, Col, FormGroup, Input, CustomInput, Label } from 'reactstrap';
import { useDispatch } from 'react-redux';
import AuthAction from '../../../../stores/auth/AuthAction';

const LoginForm = ({ hasLabel }) => {
  // State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);
  const dispatch = useDispatch();

  // Handler
  const handleSubmit = async e => {
    e.preventDefault();
    dispatch(AuthAction.login(email, password));
  };

  useEffect(() => {
    setIsDisabled(!email || !password);
  }, [email, password]);

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        {hasLabel && <Label>Correo electronico</Label>}
        <Input
          placeholder={!hasLabel ? 'Email address' : ''}
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          type="email"
          autoComplete="username"
        />
      </FormGroup>
      <FormGroup>
        {hasLabel && <Label>Contraseña</Label>}
        <Input
          placeholder={!hasLabel ? 'Password' : ''}
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          type="password"
          autoComplete="current-password"
        />
      </FormGroup>
      <Row className="justify-content-between align-items-center">
        <Col xs="auto">
          <CustomInput
            id="customCheckRemember"
            label="Remember me"
            checked={remember}
            onChange={({ target }) => setRemember(target.checked)}
            type="checkbox"
          />
        </Col>
        <Col xs="auto">
          <Link className="fs--1" to={`/auth/forget-password`}>
            ¿Olvidó su contraseña?
          </Link>
        </Col>
      </Row>
      <FormGroup>
        <Button color="primary" block className="mt-3" disabled={isDisabled}>
          Log in
        </Button>
      </FormGroup>
    </Form>
  );
};

LoginForm.propTypes = {
  layout: PropTypes.string,
  hasLabel: PropTypes.bool
};

LoginForm.defaultProps = {
  layout: 'basic',
  hasLabel: false
};

export default LoginForm;
