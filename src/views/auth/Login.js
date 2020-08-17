import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './auth-components/LoginForm';

import AuthCardLayout from '../../template/layouts/AuthCardLayout';

const Login = () => {
  return (
    <AuthCardLayout
      leftSideContent={
        <Fragment>
          <p>
            No tienes cuenta?
            <br />
            <Link className="text-white text-underline" to="/auth/register">
              Iniciar!
            </Link>
          </p>
          <p className="mb-0 mt-4 mt-md-5 fs--1 font-weight-semi-bold text-300">
            Read our{' '}
            <Link className="text-underline text-300" to="#!">
              Terminos
            </Link>{' '}
            y{' '}
            <Link className="text-underline text-300" to="#!">
              condiciones{' '}
            </Link>
          </p>
        </Fragment>
      }
    >
      <h3>Iniciar sesion</h3>
      <LoginForm layout="card" hasLabel />
    </AuthCardLayout>
  );
};

export default Login;
