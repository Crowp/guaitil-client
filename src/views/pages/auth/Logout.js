import React from 'react';
import LogoutContent from './components/LogoutContent';

import AuthCardLayout from '../../../template/layouts/AuthCardLayout';

const Logout = () => {
  return (
    <AuthCardLayout
      leftSideContent={
        <p className="mb-0 mt-4 mt-md-5 fs--1 font-weight-semi-bold text-300">
          Asociación de desarrollo integral de Guaitil
        </p>
      }
    >
      <div className="text-center">
        <LogoutContent titleTag="h3" />
      </div>
    </AuthCardLayout>
  );
};

export default React.memo(Logout);
