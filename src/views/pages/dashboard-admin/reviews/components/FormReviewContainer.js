import React from 'react';
import PropTypes from 'prop-types';
import { FormContainer } from '@/views/components/forms';
import Loader from '@/template/components/common/Loader';
import ReviewProvider from '@/views/providers/ReviewProvider';
import FormSteps from './form/index';

const FormReservationContainer = ({ defaultItem, isLoading }) => {
  return isLoading ? (
    <Loader />
  ) : (
    <FormContainer>
      <ReviewProvider defaultItem={defaultItem}>
        <FormSteps isUpdate={!!defaultItem} />
      </ReviewProvider>
    </FormContainer>
  );
};

FormReservationContainer.propTypes = {
  defaultItem: PropTypes.object,
  isLoading: PropTypes.bool
};

FormReservationContainer.defaultProps = {
  defaultItem: null,
  isLoading: false
};

export default FormReservationContainer;
