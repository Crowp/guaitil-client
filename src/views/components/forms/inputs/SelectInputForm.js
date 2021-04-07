import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import { Controller } from 'react-hook-form';
import InputContainerFrom from './components/InputContainerForm';

const SelectInputFrom = ({
  name,
  label,
  id,
  tag: Tag = Select,
  value,
  type,
  className,
  placeholder,
  options,
  onChange,
  innerRef,
  errors,
  isMulti,
  control,
  errorMessage,
  ...rest
}) => {
  const handleOnChange = !isMulti
    ? option => {
        const { value = null } = option || {};
        onChange({ name: name, value });
      }
    : values => onChange(values);
  return (
    <InputContainerFrom label={label} id={id} errors={errors} name={name} message>
      <Controller
        id={id}
        type={type}
        control={control}
        name={name}
        value={value}
        defaultValue={value}
        as={<Select />}
        onChange={([selected]) => {
          handleOnChange(selected);
          return selected;
        }}
        styles={customStyles(errors[name]?.message)}
        placeholder={placeholder}
        options={options}
        isMulti={isMulti}
        rules={{ required: errorMessage }}
        isClearable
        isSearchable
        {...rest}
      />
    </InputContainerFrom>
  );
};

const customStyles = hasErrors => ({
  control: (base, state) => ({
    ...base,
    borderColor: hasErrors ? '#e63757' : base.borderColor
  })
});

SelectInputFrom.propTypes = {
  control: PropTypes.any.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  name: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  isMulti: PropTypes.bool,
  errors: PropTypes.object.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })
  ).isRequired
};

SelectInputFrom.defaultProps = {
  type: 'select',
  isMulti: false
};

export default SelectInputFrom;
