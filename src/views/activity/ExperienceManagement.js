import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import Starter from '../components/extra/Starter';
import { isIterableArray } from '../../template/helpers/utils';
import ActivityTable from './ActivityTable';
import { useSelector, useDispatch } from 'react-redux';
import { selectExperience } from '../../selectors/activity/ActivitySelector';
import { selectRequesting } from '../../selectors/requesting/RequestingSelector';
import ActivityAction from '../../stores/activity/ActivityAction';
import { Col, Row } from 'reactstrap';

const ExperienceManagement = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const activities = useSelector(selectExperience);
  const isRequesting = useSelector(state => selectRequesting(state, [ActivityAction.REQUEST_ACTIVITY]));

  useEffect(() => {
    dispatch(ActivityAction.getActivities());
  }, [dispatch]);

  return isRequesting ? (
    <Row className="min-vh-75 h-75">
      <Col className="d-flex justify-content-center align-items-center">
        <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" color="primary" />
      </Col>
    </Row>
  ) : isIterableArray(activities) ? (
    <ActivityTable activities={activities} title="Vivencias" />
  ) : (
    <Starter
      action={() => history.push('/activities/experiences/create')}
      actionName="Registra una vivencia"
      title="Administración de vivencias"
      description="No hay vivencias aún!"
    />
  );
};

export default ExperienceManagement;
