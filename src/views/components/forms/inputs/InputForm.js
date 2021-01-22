import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';
import InputContainerFrom from './components/InputContainerForm';
import classNames from 'classnames';

const InputFrom = ({ name, label, id, value, type, className, placeholder, onChange, errors, ...rest }) => (
  <InputContainerFrom label={label} id={id} errors={errors} name={name} message>
    <Input
      name={name}
      id={id}
      defaultValue={value}
      type={type}
      onChange={({ target: { value } }) => onChange({ name: name, value })}
      placeholder={placeholder}
      className={classNames(className, { 'border-danger': errors[name]?.message })}
      {...rest}
    />
  </InputContainerFrom>
);

InputFrom.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  name: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func
};

InputFrom.defaultProps = {
  required: false,
  type: 'text',
  onChange: () => {}
};

export default InputFrom;
