import React from 'react';

import AuthCardLayout from '../../../template/layouts/AuthCardLayout';
import PasswordResetForm from './components/PasswordResetForm';
import withAuthentication from '../../../template/hoc/withAuthentication';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../../selectors/auth/AuthSelector';

const PasswordReset = () => {
  const { firstLogin, resetPassword, idUser } = useSelector(selectAuth);
  const textPrimary = 'Cambie la contraseña por defecto que se le ha asignado mediante su correo electronico';
  const textSecondary = 'Solo debe digitar su nueva contraseña y confirmarla en el siguiente campo';
  return (
    <AuthCardLayout textPrimary={textPrimary} textSecondary={textSecondary}>
      <h3>{firstLogin && !resetPassword ? 'Cambiar contraseña' : 'Reestablecer contraseña'}</h3>
      <PasswordResetForm layout="card" hasLabel idUser={idUser} />
    </AuthCardLayout>
  );
};

export default withAuthentication(PasswordReset);
