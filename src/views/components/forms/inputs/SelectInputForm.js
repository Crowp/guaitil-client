import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

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
  ...rest
}) => {
  return (
    <InputContainerFrom label={label} id={id} errors={errors} name={name} message>
      <Tag
        isClearable
        isSearchable
        name={name}
        id={id}
        value={value}
        type={type}
        onChange={option => {
          const { value = null } = option || {};
          onChange({ name: name, value });
        }}
        placeholder={placeholder}
        options={options}
        {...rest}
      />
    </InputContainerFrom>
  );
};

SelectInputFrom.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  name: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })
  ).isRequired
};

SelectInputFrom.defaultProps = {
  type: 'select'
};

export default SelectInputFrom;
