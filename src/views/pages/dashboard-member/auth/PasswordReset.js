import React from 'react';
import { Card, CardBody } from 'reactstrap';
import PasswordResetForm from './components/PasswordResetForm';

const PasswordReset = () => {
  return (
    <Card>
      <CardBody className="text-center m-0" color="primary">
        <h4>Cambiar contraseña</h4>
      </CardBody>
      <PasswordResetForm layaut="card" hasLabel />
    </Card>
  );
};
export default PasswordReset;
