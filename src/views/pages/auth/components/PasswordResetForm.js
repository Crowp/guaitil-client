import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

const PasswordResetForm = ({ hasLabel }) => {
  // State
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  // Handler
  const handleSubmit = async e => {
    e.preventDefault();
  };

  useEffect(() => {
    setIsDisabled(!confirmPassword || !password);
  }, [confirmPassword, password]);

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        {hasLabel && <Label>Contraseña</Label>}
        <Input
          placeholder={!hasLabel ? 'Contraseña' : ''}
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          type="password"
          autoComplete="contraseña-actual"
        />
        <FormGroup>
          {hasLabel && <Label>Confirmar contraseña</Label>}
          <Input
            placeholder={!hasLabel ? 'Confirmar contraseña' : ''}
            value={confirmPassword}
            onChange={({ target }) => setConfirmPassword(target.value)}
            type="password"
            autoComplete="confirmar-contraseña"
          />
        </FormGroup>
        <Button color="warning" block className="mt-3" disabled={isDisabled}>
          Iniciar Sesión
        </Button>
      </FormGroup>
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
