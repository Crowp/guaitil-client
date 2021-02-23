import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Input, Label } from 'reactstrap';
import WizardError from './WizardError';
import Datetime from 'react-datetime';
import classNames from 'classnames';

const WizardInput = ({
  label,
  id,
  name,
  errors,
  value,
  onChange,
  tag: Tag = Input,
  type = 'text',
  options = [],
  placeholder,
  className,
  customType,
  ...rest
}) => {
  console.log(value);
  if (customType === 'datetime') {
    return (
      <FormGroup>
        {!!label && <Label>{label}</Label>}
        <Datetime
          id={id}
          timeFormat={false}
          value={value}
          onChange={setStartDate => onChange({ name: name, value: setStartDate })}
          inputProps={{
            name,
            placeholder
          }}
          {...rest}
        />
      </FormGroup>
    );
  }

  if (type === 'checkbox' || type === 'switch' || type === 'radio') {
    return (
      <FormGroup>
        <Tag
          name={name}
          id={id}
          type={type}
          className={className}
          onChange={onChange}
          label={
            <>
              {label}
              <WizardError error={errors[name]?.message} className="fs--1 font-weight-normal d-block" />
            </>
          }
          {...rest}
        />
      </FormGroup>
    );
  }
  if (type === 'select') {
    return (
      <FormGroup>
        {!!label && <Label for={id}>{label}</Label>}
        <Tag
          name={name}
          id={id}
          value={value}
          type={type}
          label={label}
          onChange={onChange}
          options={options}
          className={classNames(className, { 'border-danger': errors[name]?.message })}
          {...rest}
        />
        <WizardError error={errors[name]?.message} className="mt-1" />
      </FormGroup>
    );
  }
  return (
    <FormGroup>
      {!!label && <Label for={id}>{label}</Label>}
      <Tag
        name={name}
        id={id}
        defaultValue={typeof value === 'string' ? value : value[name]}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        className={classNames(className, { 'border-danger': errors[name]?.message })}
        {...rest}
      />
      <WizardError error={errors[name]?.message} className="mt-1" />
    </FormGroup>
  );
};

WizardInput.propTypes = { label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]) };

WizardInput.defaultProps = { required: false };

export default React.memo(WizardInput);
