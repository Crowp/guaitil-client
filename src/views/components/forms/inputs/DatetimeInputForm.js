import React from 'react';
import PropTypes from 'prop-types';
import Datetime from 'react-datetime';
import InputContainerFrom from './components/InputContainerForm';

const DatetimeInputFrom = ({ name, label, id, value, placeholder, onChange, timeFormat, ...rest }) => (
  <InputContainerFrom label={label} id={id}>
    <Datetime
      id={id}
      timeFormat={timeFormat}
      value={value}
      onChange={value => onChange({ name: name, value })}
      inputProps={{
        name,
        placeholder
      }}
      {...rest}
    />
  </InputContainerFrom>
);

DatetimeInputFrom.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  name: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func
};

DatetimeInputFrom.defaultProps = {
  required: false,
  timeFormat: false
};

export default DatetimeInputFrom;
