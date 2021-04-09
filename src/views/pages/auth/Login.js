import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LoginForm from './components/LoginForm';
import AuthCardLayout from '../../../template/layouts/AuthCardLayout';
import { selectAuth, selectAuthenticated } from '../../../selectors/auth/AuthSelector';
import { RouteMap } from '../../../constants';

const Login = () => {
  const isAuthenticated = useSelector(selectAuthenticated);
  const { roles, firstLogin, resetPassword } = useSelector(selectAuth);
  const history = useHistory();
  useEffect(() => {
    if (firstLogin || resetPassword) {
      history.push(RouteMap.Auth.resetPassword());
    } else if (isAuthenticated) {
      history.push(RouteMap.Dashboard.root());
    }
  }, [isAuthenticated, roles, history, firstLogin, resetPassword]);
  const textPrimary = 'Solo asociados, miembros y administradores de la página pueden iniciar sesión';
  const textSecondary = 'Puedes iniciar sesión en el momento que quieras, únicamente con tu correo y contraseña';

  return (
    <AuthCardLayout textPrimary={textPrimary} textSecondary={textSecondary}>
      <h3>Iniciar Sesión</h3>
      <LoginForm layout="card" hasLabel />
    </AuthCardLayout>
  );
};

export default React.memo(Login);
