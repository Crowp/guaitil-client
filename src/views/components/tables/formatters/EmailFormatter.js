import React from 'react';
import PropTypes from 'prop-types';

const EmailFormatter = email => <a href={`mailto:${email}`}>{email}</a>;

EmailFormatter.propTypes = {
  email: PropTypes.string.isRequired
};

export default EmailFormatter;
