import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import SuccessContainer from '../../../../../../components/forms/form-steps/SuccessContainer';
import ActivityAction from '../../../../../../../stores/activity/ActivityAction';
import { RouteMap } from '../../../../../../../constants';

const SuccessStep = ({ title }) => {
  const actionTypes = useMemo(
    () => [ActivityAction.REQUEST_ACTIVITY_CREATE, ActivityAction.REQUEST_ACTIVITY_UPDATE],
    []
  );
  return (
    <SuccessContainer
      title={title}
      redirectUrl={RouteMap.Activity.root()}
      description="Ir a actividades"
      actionTypes={actionTypes}
    />
  );
};

SuccessStep.propTypes = {
  title: PropTypes.string.isRequired
};
export default SuccessStep;
