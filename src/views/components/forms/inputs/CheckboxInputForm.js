import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';
import MessageError from './components/MessageError';
import InputContainerFrom from './components/InputContainerForm';

const CheckboxInputFrom = ({ name, label, id, type, className, onChange, errors, ...rest }) => (
  <InputContainerFrom>
    <Input
      name={name}
      id={id}
      type={type}
      onChange={({ target: { checked } }) => onChange({ name: name, value: checked })}
      className={className}
      label={
        <>
          {label}
          <MessageError error={errors[name]?.message} className="fs--1 font-weight-normal d-block" />
        </>
      }
      {...rest}
    />
  </InputContainerFrom>
);

CheckboxInputFrom.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  name: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.oneOf(['checkbox', 'switch', 'radio'])
};

CheckboxInputFrom.defaultProps = {
  required: false,
  type: 'checkbox'
};

export default CheckboxInputFrom;
