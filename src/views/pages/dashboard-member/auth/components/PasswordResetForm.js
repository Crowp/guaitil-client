import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import withRedirect from '../../../../../template/hoc/withRedirect';
import Label from 'reactstrap/es/Label';

const PasswordResetForm = ({ setRedirect, hasLabel }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const handleSubmit = e => {
    e.preventDefault();
    toast.success('La contraseña se ha cambiado exitosamente');
    setRedirect(true);
  };

  useEffect(() => {
    if (password === '' || confirmPassword === '') return setIsDisabled(true);
    setIsDisabled(password !== confirmPassword);
  }, [password, confirmPassword]);

  return (
    <Form className="mt-0 mb-2 pt-2 pr-4 pl-4 pb-4" onSubmit={handleSubmit}>
      <FormGroup>
        {hasLabel && <Label>Contraseña nueva</Label>}
        <Input
          placeholder={!hasLabel ? 'Contraseña' : ''}
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          type="password"
        />
      </FormGroup>
      <FormGroup>
        {hasLabel && <Label>Confirmar contraseña</Label>}
        <Input
          placeholder={!hasLabel ? 'Confirmar contraseña' : ''}
          value={confirmPassword}
          onChange={({ target }) => setConfirmPassword(target.value)}
          type="password"
        />
      </FormGroup>
      <Button color="primary" block className="mt-5" disabled={isDisabled}>
        Cambiar contraseña
      </Button>
    </Form>
  );
};

PasswordResetForm.propTypes = {
  setRedirect: PropTypes.func,
  setRedirectUrl: PropTypes.func,
  layout: PropTypes.string,
  hasLabel: PropTypes.bool
};

PasswordResetForm.defaultProps = { layout: 'basic', hasLabel: false };

export default withRedirect(PasswordResetForm);
