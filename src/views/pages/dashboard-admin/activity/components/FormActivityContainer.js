import React from 'react';
import PropTypes from 'prop-types';
import { FormContainer } from '@/views/components/forms';
import Loader from '@/template/components/common/Loader';
import ActivityProvider from '@/views/providers/ActivityProvider';
import FormSteps from './form';

const FormActivityContainer = ({ defaultItem, isLoading }) => {
  return isLoading ? (
    <Loader />
  ) : (
    <FormContainer>
      <ActivityProvider defaultItem={defaultItem}>
        <FormSteps isUpdate={!!defaultItem} />
      </ActivityProvider>
    </FormContainer>
  );
};

FormActivityContainer.propTypes = {
  defaultItem: PropTypes.object,
  isLoading: PropTypes.bool
};

FormActivityContainer.defaultProps = {
  defaultItem: null,
  isLoading: false
};

export default FormActivityContainer;
