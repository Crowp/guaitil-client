import React, { useEffect } from 'react';
import { Alert, Card, CardBody, Col, CustomInput, Form, Row } from 'reactstrap';
import ActivityItem from './ActivityItem';
import NavbarStandard from '../../../../template/components/navbar/NavbarStandard';
import Section from '../../../../template/components/common/Section';
import Loader from '../../../../template/components/common/Loader';
import FalconCardHeader from '../../../../template/components/common/FalconCardHeader';
import eventCategories from '../../../../template/data/event/eventCategories';
import createMarkup from '../../../../template/helpers/createMarkup';
import { selectRequesting } from '../../../../selectors/requesting/RequestingSelector';
import { selectActivitiesClient } from '../../../../selectors/activity/ActivitySelector';
import ActivityAction from '../../../../stores/activity/ActivityAction';
import { isIterableArray } from '../../../../template/helpers/utils';
import { useDispatch, useSelector } from 'react-redux';

const Activities = ({ match, location }) => {
  const dispatch = useDispatch();

  const activities = useSelector(selectActivitiesClient);
  const isRequesting = useSelector(state => selectRequesting(state, [ActivityAction.REQUEST_ACTIVITY]));

  useEffect(() => {
    dispatch(ActivityAction.getActivities());
  }, [dispatch]);

  return (
    <>
      <NavbarStandard location={location} match={match} hasColor />
      <Section>
        <Card>
          <FalconCardHeader title="Actividades">
            {isIterableArray(eventCategories) && (
              <Form inline>
                <CustomInput type="select" id="customSelectCategory" name="customSelectCategory" bsSize="sm">
                  <option value="all">Todos</option>
                  <option value="tours">Tours</option>
                  <option value="experiences">Vivencias</option>
                </CustomInput>
              </Form>
            )}
          </FalconCardHeader>
          <CardBody className="fs--1">
            {isRequesting ? (
              <Loader />
            ) : isIterableArray(activities) ? (
              <Row>
                {activities.map(({ additional, ...rest }, index) => (
                  <Col md={6} className="h-100" key={index}>
                    <ActivityItem divider={activities.length !== index + 1} {...rest}>
                      <p className="text-1000 mb-0 text-break" dangerouslySetInnerHTML={createMarkup(additional)} />
                    </ActivityItem>
                  </Col>
                ))}
              </Row>
            ) : (
              <Alert color="info" className="mb-0">
                No events found!
              </Alert>
            )}
          </CardBody>
        </Card>
      </Section>
    </>
  );
};

export default React.memo(Activities);
