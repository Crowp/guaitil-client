import React, { Fragment, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LoginForm from './auth-components/LoginForm';
import AuthCardLayout from '../../template/layouts/AuthCardLayout';
import { selectAuthenticated } from '../../selectors/auth/AuthSelector';

const Login = () => {
  const isAuthenticated = useSelector(selectAuthenticated);
  const history = useHistory();
  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }
  }, [isAuthenticated, history]);

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
