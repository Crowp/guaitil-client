import React from 'react';
import PropTypes from 'prop-types';
import { FormContainer } from '@/views/components/forms';
import Loader from '@/template/components/common/Loader';
import MemberProvider from '@/views/providers/MemberProvider';
import FormSteps from './form';

const FormLocalContainer = ({ defaultItem, isLoading }) => {
  const defaultMember = !!defaultItem && { member: defaultItem };
  return isLoading ? (
    <Loader />
  ) : (
    <FormContainer>
      <MemberProvider defaultItem={defaultMember}>
        <FormSteps isUpdate={!!defaultItem} />
      </MemberProvider>
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
