import React from 'react';
import PropTypes from 'prop-types';

const EmailFormatter = email => (
  <a target="_blank" rel="noopener noreferrer" href={`mailto:${email}`}>
    {email}
  </a>
);

EmailFormatter.propTypes = {
  email: PropTypes.string.isRequired
};

export default EmailFormatter;
