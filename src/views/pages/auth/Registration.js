import React from 'react';
import { Button } from 'reactstrap';
import RegistrationForm from './auth-components/RegistrationForm';
import AuthCardLayout from '../../template/layouts/AuthCardLayout';
import { Link } from 'react-router-dom';

const Registration = () => (
  <AuthCardLayout
    leftSideContent={
      <p className="pt-3">
        Have an account?
        <br />
        <Button tag={Link} color="outline-light" className="mt-2 px-4" to="/auth/login">
          Iniciar sesion
        </Button>
      </p>
    }
  >
    <h3>Register</h3>
    <RegistrationForm layout="card" hasLabel />
  </AuthCardLayout>
);

export default Registration;
