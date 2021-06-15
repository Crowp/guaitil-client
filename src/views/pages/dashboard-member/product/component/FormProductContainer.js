import React from 'react';
import PropTypes from 'prop-types';
import Loader from '@/template/components/common/Loader';
import { FormContainer } from '@/views/components/forms';
import ProductProvider from '@/views/providers/ProductProvider';
import FormSteps from './form';

const FormProductContainer = ({ defaultItem, localId, isLoading }) => {
  return isLoading ? (
    <Loader />
  ) : (
    <FormContainer>
      <ProductProvider defaultItem={defaultItem} localId={localId}>
        <FormSteps isUpdate={!!defaultItem} />
      </ProductProvider>
    </FormContainer>
  );
};

export default FormProductContainer;

FormProductContainer.propTypes = {
  defaultItem: PropTypes.object,
  isLoading: PropTypes.bool
};

FormProductContainer.defaultProps = {
  defaultItem: null,
  isLoading: false
};
