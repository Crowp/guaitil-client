import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import rocket from '../../../../template/assets/img/illustrations/rocket.png';

const LogoutContent = ({ titleTag: TitleTag }) => {
  return (
    <Fragment>
      <img className="d-block mx-auto mb-4" src={rocket} alt="shield" width={70} />
      <TitleTag>¡Nos vemos luego!</TitleTag>
      <Button tag={Link} color="primary" size="sm" className="mt-3" to="/authentication/login">
        <FontAwesomeIcon icon="chevron-left" transform="shrink-4 down-1" className="mr-1" />
        Volver al inicio de sesión
      </Button>
    </Fragment>
  );
};

LogoutContent.propTypes = {
  titleTag: PropTypes.string
};

LogoutContent.defaultProps = {
  layout: 'basic',
  titleTag: 'h4'
};

export default LogoutContent;
