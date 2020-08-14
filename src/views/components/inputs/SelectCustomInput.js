import React, { useContext, Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Input, Label } from 'reactstrap';
import WizardError from './WizardError';
import { PersonContext } from '../../context';
import Datetime from 'react-datetime';
import classNames from 'classnames';

const WizardInput = ({
  label,
  id,
  name,
  value,
  errors,
  tag: Tag = Input,
  type = 'text',
  options = [],
  placeholder,
  className,
  ...rest
}) => {
  return (
    <FormGroup>
      {!!label && <Label for={id}>{label}</Label>}
      <Tag
        name={name}
        id={id}
        defaultValue={value[name]}
        type={type}
        label={label}
        className={classNames(className, { 'border-danger': errors[name]?.message })}
        {...rest}
      >
        <option value="">{placeholder}</option>
        {options.map((option, index) => (
          <option value={option} key={index}>
            {option}
          </option>
        ))}
      </Tag>
      <WizardError error={errors[name]?.message} className="mt-1" />
    </FormGroup>
  );
};

WizardInput.propTypes = { label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]) };

WizardInput.defaultProps = { required: false };

export default WizardInput;
