import React from 'react';
import PropTypes from 'prop-types';
import CreatableSelect from 'react-select/creatable';
import SelectInputForm from './SelectInputForm';

const CreatableSelectInputForm = ({ isLoading, onCreateOption, ...rest }) => (
  <SelectInputForm
    tag={CreatableSelect}
    isClearable
    isDisabled={isLoading}
    isLoading={isLoading}
    onCreateOption={onCreateOption}
    {...rest}
  />
);

CreatableSelectInputForm.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  onCreateOption: PropTypes.func.isRequired
};

export default CreatableSelectInputForm;
