import React from 'react';
import PropTypes from 'prop-types';
import { FormContainer } from '@/views/components/forms';
import Loader from '@/template/components/common/Loader';
import LocalProvider from '@/views/providers/LocalProvider';
import FormSteps from './form';

const FormLocalContainer = ({ defaultItem: local, defaultUser: user, isLoading }) => {
  return isLoading ? (
    <Loader />
  ) : (
    <FormContainer>
      <LocalProvider defaultItem={!!local && { local, user }}>
        <FormSteps isUpdate={!!local} />
      </LocalProvider>
    </FormContainer>
  );
};

FormLocalContainer.propTypes = {
  defaultItem: PropTypes.object,
  isLoading: PropTypes.bool
};

FormLocalContainer.defaultProps = {
  defaultItem: null,
  isLoading: false
};

export default FormLocalContainer;
