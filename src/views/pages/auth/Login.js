import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LoginForm from './components/LoginForm';
import AuthCardLayout from '../../../template/layouts/AuthCardLayout';
import { selectAuthenticated } from '../../../selectors/auth/AuthSelector';

const Login = () => {
  const isAuthenticated = useSelector(selectAuthenticated);
  const history = useHistory();
  useEffect(() => {
    if (isAuthenticated) {
      history.push('/dashboard');
    }
  }, [isAuthenticated, history]);

  return (
    <AuthCardLayout>
      <h3>Iniciar Sesión</h3>
      <LoginForm layout="card" hasLabel />
    </AuthCardLayout>
  );
};

export default React.memo(Login);
