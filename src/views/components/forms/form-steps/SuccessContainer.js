import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import { useHistory } from 'react-router-dom';

import Success from './Success';
import SuccessLoading from './SuccessLoading';
import { useIsRequesting, useHasErrors } from '../../../hooks';

const SuccessContainer = ({ redirectUrl, description, actionTypes, title }) => {
  const history = useHistory();

  const isRequesting = useIsRequesting(actionTypes);
  const hasErrors = useHasErrors(actionTypes);

  const onHandleClick = () => history.push(redirectUrl);

  return (
    <Row>
      <Col className="text-center">
        {isRequesting ? (
          <SuccessLoading />
        ) : (
          <Success onClick={onHandleClick} description={description} hasErrors={hasErrors} title={title} />
        )}
      </Col>
    </Row>
  );
};

SuccessContainer.propTypes = {
  title: PropTypes.string.isRequired,
  redirectUrl: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  actionTypes: PropTypes.array.isRequired
};

export default SuccessContainer;
