import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';
import InputContainerFrom from './components/InputContainerForm';
import classNames from 'classnames';

const InputFrom = ({ name, label, id, value, type, className, placeholder, onChange, errors, tag: Tag, ...rest }) => {
  return (
    <InputContainerFrom label={label} id={id} errors={errors} name={name} message>
      <Input
        name={name}
        tag={Tag}
        id={id}
        defaultValue={value}
        type={type}
        onChange={({ target: { value } }) => onChange({ name: name, value })}
        placeholder={placeholder}
        invalid={!!errors[name]}
        className={classNames(className, { 'border-danger': errors[name]?.message })}
        {...rest}
      />
    </InputContainerFrom>
  );
};

InputFrom.propTypes = {
  id: PropTypes.any.isRequired,
  value: PropTypes.any,
  type: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  name: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  errors: PropTypes.any,
  onChange: PropTypes.func,
  tag: PropTypes.any
};

InputFrom.defaultProps = {
  required: false,
  type: 'text',
  onChange: () => {}
};

export default InputFrom;
