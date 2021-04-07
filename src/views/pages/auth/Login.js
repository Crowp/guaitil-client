import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LoginForm from './components/LoginForm';
import AuthCardLayout from '../../../template/layouts/AuthCardLayout';
import { selectAuth, selectAuthenticated } from '../../../selectors/auth/AuthSelector';
import { RouteMap } from '../../../constants';

const Login = () => {
  const isAuthenticated = useSelector(selectAuthenticated);
  const { roles } = useSelector(selectAuth);
  const history = useHistory();
  useEffect(() => {
    if (isAuthenticated && roles.map(role => role === 'ROLE_SUPER_ADMIN' || role === 'ROLE_ADMIN')) {
      history.push(RouteMap.Dashboard.root());
    }
    if (isAuthenticated && roles.map(role => role === 'ROLE_ASSOCIATED')) {
      history.push(RouteMap.LocalMember.root());
    }
  }, [isAuthenticated, roles, history]);

  return (
    <AuthCardLayout>
      <h3>Iniciar Sesión</h3>
      <LoginForm layout="card" hasLabel />
    </AuthCardLayout>
  );
};

export default React.memo(Login);
