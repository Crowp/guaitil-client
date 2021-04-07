import React, { useEffect } from 'react';
import { Alert, Card, CardBody, Col, CustomInput, Form, Row } from 'reactstrap';
import ActivityItem from './ActivityItem';
import Section from '../../../../template/components/common/Section';
import Loader from '../../../../template/components/common/Loader';
import FalconCardHeader from '../../../../template/components/common/FalconCardHeader';
import eventCategories from '../../../../template/data/event/eventCategories';
import createMarkup from '../../../../template/helpers/createMarkup';
import { selectActivitiesClient } from '../../../../selectors/activity/ActivitySelector';
import { isIterableArray } from '../../../../template/helpers/utils';
import { useActivitiesActiveEffect } from '../../../hooks';

const Activities = () => {
  const { items: activities, isRequesting } = useActivitiesActiveEffect(selectActivitiesClient);
  return (
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
              No hay actividades registradas
            </Alert>
          )}
        </CardBody>
      </Card>
    </Section>
  );
};

export default React.memo(Activities);
