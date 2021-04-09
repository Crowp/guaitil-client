import React from 'react';

import AuthCardLayout from '../../../template/layouts/AuthCardLayout';
import PasswordResetForm from './components/PasswordResetForm';

const PasswordReset = () => {
  const textPrimary = 'Cambie la contraseña por defecto que se le ha asignado mediante su correo electronico';
  const textSecondary = 'Solo debe digitar su nueva contraseña y confirmarla en el siguiente campo';

  return (
    <AuthCardLayout textPrimary={textPrimary} textSecondary={textSecondary}>
      <h3>Cambiar contraseña</h3>
      <PasswordResetForm layout="card" hasLabel />
    </AuthCardLayout>
  );
};

export default React.memo(PasswordReset);
