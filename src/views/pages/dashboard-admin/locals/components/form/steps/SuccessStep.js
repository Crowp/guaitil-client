import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import SuccessContainer from '../../../../../../components/forms/form-steps/SuccessContainer';
import LocalAction from '../../../../../../../stores/local/LocalAction';
import UserAction from '../../../../../../../stores/user/UserAction';
import { RouteMap } from '../../../../../../../constants';

const SuccessStep = ({ title }) => {
  const actionTypes = useMemo(
    () => [
      LocalAction.REQUEST_LOCAL_CREATE,
      LocalAction.REQUEST_LOCAL_UPDATE,
      UserAction.REQUEST_USER_CREATE,
      UserAction.REQUEST_USER_UPDATE
    ],
    []
  );
  return (
    <SuccessContainer
      title={title}
      redirectUrl={RouteMap.Local.root()}
      description="Ir a locales"
      actionTypes={actionTypes}
    />
  );
};

SuccessStep.propTypes = {
  title: PropTypes.string.isRequired
};
export default SuccessStep;
