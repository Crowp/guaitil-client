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
  isMulti,
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
      <Tag
        isClearable
        isSearchable
        name={name}
        id={id}
        value={value}
        type={type}
        isMulti={isMulti}
        onChange={handleOnChange}
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
  isMulti: PropTypes.bool,
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
