import React, { useState, useEffect } from 'react';
import { Col, Row, Spinner } from 'reactstrap';
import FormSteps from './components/edit/FormSteps';
import Section from '@/template/components/common/Section';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { isIterableArray } from '@/template/helpers/utils';
import { selectRequesting } from '../../../../selectors/requesting/RequestingSelector';
import ActivityProvider from '../../../providers/ActivityProvider';
import ActivityAction from '../../../../stores/activity/ActivityAction';
import { hasErrors, selectRawErrors } from '../../../../selectors/error/ErrorSelector';
import ErrorAction from '../../../../stores/error/ErrorAction';
import LocalAction from '../../../../stores/local/LocalAction';

const EditActivity = ({
  match: {
    params: { id }
  }
}) => {
  const [activity, setActivity] = useState({});
  const history = useHistory();
  const dispatch = useDispatch();
  const activities = useSelector(state => state.activities);

  const isRequesting = useSelector(state => selectRequesting(state, [ActivityAction.REQUEST_ACTIVITY_BY_ID]));
  const exitsErrors = useSelector(state => hasErrors(state, [ActivityAction.REQUEST_ACTIVITY_BY_ID_FINISHED]));
  const errors = useSelector(state => selectRawErrors(state, [ActivityAction.REQUEST_ACTIVITY_BY_ID_FINISHED]));
  const isEmptyObject = !Object.keys(activity).length;

  useEffect(() => {
    if (isIterableArray(activities)) {
      const [activityEdit] = activities.filter(item => item.id === Number(id));
      setActivity(activityEdit);
    } else {
      dispatch(ActivityAction.getActivityById(id));
    }
  }, [activities, id, dispatch]);

  useEffect(() => {
    dispatch(LocalAction.getLocals());
  }, [dispatch]);

  useEffect(() => {
    if (!isRequesting && isEmptyObject && exitsErrors) {
      history.push('/admin/activities');
      dispatch(ErrorAction.removeById(errors[ActivityAction.REQUEST_ACTIVITY_BY_ID_FINISHED].id));
    }
  }, [isRequesting, exitsErrors, dispatch, history, errors, isEmptyObject]);

  return isRequesting || isEmptyObject ? (
    <Row className="min-vh-75 h-75">
      <Col className="d-flex justify-content-center align-items-center">
        <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" color="primary" />
      </Col>
    </Row>
  ) : (
    <Section className="py-0">
      <Row className="flex-center align-items-start min-vh-75 py-3">
        <Col sm={10} lg={7} className="col-xxl-5">
          <ActivityProvider defaultActivity={activity}>
            <FormSteps />
          </ActivityProvider>
        </Col>
      </Row>
    </Section>
  );
};

export default React.memo(EditActivity);
