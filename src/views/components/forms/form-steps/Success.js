import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import Lottie from 'react-lottie';

import animationData from '../../lottie/celebration.json';
import warningLight from '../../lottie/warning-light.json';

const Success = ({ hasErrors, onClick, description, title }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: hasErrors ? warningLight : animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  return (
    <>
      <div className="wizard-lottie-wrapper" style={hasErrors ? { paddingTop: 125, paddingBottom: 20 } : {}}>
        <div className="wizard-lottie mx-auto" style={hasErrors ? { width: 200, height: 200 } : {}}>
          <Lottie options={defaultOptions} />
        </div>
      </div>
      <h4 className="mb-1">{hasErrors ? 'Ha ocurrido un hasErrors' : title}</h4>
      <p className="fs-0">{hasErrors ? 'No se ha guardado correctamente' : 'Se ha guardado correctamente'} </p>
      <Button color="primary" className="px-5 my-3 text-white" onClick={onClick}>
        {description}
      </Button>
    </>
  );
};

Success.propTypes = {
  hasErrors: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default Success;
