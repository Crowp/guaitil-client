import React from 'react';
import PropTypes from 'prop-types';
import { FormContainer } from '@/views/components/forms';
import Loader from '@/template/components/common/Loader';
import ReservationProvider from '@/views/providers/ReservationProvider';
import FormSteps from './form';

const FormReservationContainer = ({ defaultItem, isLoading }) => {
  return isLoading ? (
    <Loader />
  ) : (
    <FormContainer>
      <ReservationProvider defaultItem={defaultItem}>
        <FormSteps isUpdate={!!defaultItem} />
      </ReservationProvider>
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
