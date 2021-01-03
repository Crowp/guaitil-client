import React from 'react';
import PropTypes from 'prop-types';

const PhoneFormatter = phone => <a href={`tel:${phone}`}>{phone}</a>;
PhoneFormatter.propTypes = {
  phone: PropTypes.string.isRequired
};

export default PhoneFormatter;
