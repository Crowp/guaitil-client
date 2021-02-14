import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import SuccessContainer from '../../../../../../components/forms/form-steps/SuccessContainer';
import MemberAction from '../../../../../../../stores/member/MemberAction';
import { RouteMap } from '../../../../../../../constants';

const SuccessStep = ({ title }) => {
  const actionTypes = useMemo(
    () => [
      MemberAction.REQUEST_MEMBER_CREATE,
      MemberAction.REQUEST_MEMBER_CREATE_USER_LOCAL,
      MemberAction.REQUEST_MEMBER_UPDATE
    ],
    []
  );
  return (
    <SuccessContainer
      title={title}
      redirectUrl={RouteMap.Member.root()}
      description="Ir a miembros"
      actionTypes={actionTypes}
    />
  );
};

SuccessStep.propTypes = {
  title: PropTypes.string.isRequired
};
export default SuccessStep;
