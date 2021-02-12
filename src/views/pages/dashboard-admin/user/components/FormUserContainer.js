import React from 'react';
import PropTypes from 'prop-types';
import { FormContainer } from '@/views/components/forms';
import Loader from '@/template/components/common/Loader';
import UserProvider from '@/views/providers/UserProvider';
import FormSteps from './form';

const FormUserContainer = ({ defaultItem, isLoading }) => {
  return isLoading ? (
    <Loader />
  ) : (
    <FormContainer>
      <UserProvider defaultItem={defaultItem}>
        <FormSteps isUpdate={!!defaultItem} />
      </UserProvider>
    </FormContainer>
  );
};

FormUserContainer.propTypes = {
  defaultItem: PropTypes.object,
  isLoading: PropTypes.bool
};

FormUserContainer.defaultProps = {
  defaultItem: null,
  isLoading: false
};

export default FormUserContainer;
