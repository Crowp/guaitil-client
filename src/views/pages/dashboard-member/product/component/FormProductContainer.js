import React from 'react';
import PropTypes from 'prop-types';
import { FormContainer } from '@/views/components/forms';
import ProductProvider from '@/views/providers/ProductProvider';
import FormSteps from './form';

const FormProductContainer = ({ defaultItem, idLocal }) => {
  return (
    <FormContainer>
      <ProductProvider defaultItem={defaultItem}>
        <FormSteps isUpdate={!!defaultItem} idLocal={idLocal} />
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
