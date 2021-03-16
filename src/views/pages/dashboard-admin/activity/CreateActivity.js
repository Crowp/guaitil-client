import React from 'react';
import useActivitiesEffect from '../../../hooks/useActivitiesEffect';
import FormActivityContainer from './components/FormActivityContainer';

const CreateActivity = () => {
  const { isRequesting } = useActivitiesEffect();
  return <FormActivityContainer isloading={isRequesting} />;
};

export default CreateActivity;
