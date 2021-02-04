import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import SuccessContainer from '../../../../../../components/forms/form-steps/SuccessContainer';
import UserAction from '../../../../../../../stores/user/UserAction';
import { RouteMap } from '../../../../../../../constants';

const SuccessStep = ({ title }) => {
  const actionTypes = useMemo(() => [UserAction.REQUEST_USER_CREATE, UserAction.REQUEST_USER_UPDATE], []);
  return (
    <SuccessContainer
      title={title}
      redirectUrl={RouteMap.User.root()}
      description="Ir a usuarios"
      actionTypes={actionTypes}
    />
  );
};

SuccessStep.propTypes = {
  title: PropTypes.string.isRequired
};
export default SuccessStep;
