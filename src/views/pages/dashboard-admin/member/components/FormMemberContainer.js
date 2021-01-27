import React from 'react';
import PropTypes from 'prop-types';
import { FormContainer } from '@/views/components/forms';
import Loader from '@/template/components/common/Loader';
import LocalProvider from '@/views/providers/LocalProvider';
import UserProvider from '@/views/providers/UserProvider';
import MemberProvider from '@/views/providers/MemberProvider';
import FormSteps from './form';

const FormLocalContainer = ({ defaultItem, isLoading }) => {
  return isLoading ? (
    <Loader />
  ) : (
    <FormContainer>
      <UserProvider>
        <LocalProvider>
          <MemberProvider defaultItem={defaultItem}>
            <FormSteps isUpdate={!!defaultItem} />
          </MemberProvider>
        </LocalProvider>
      </UserProvider>
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
