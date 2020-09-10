import React from 'react';
import PropTypes from 'prop-types';

const EmailFormatter = email => (
  <a target="_blank" href={`mailto:${email}`}>
    {email}
  </a>
);

EmailFormatter.propTypes = {
  email: PropTypes.string.isRequired
};

export default EmailFormatter;
