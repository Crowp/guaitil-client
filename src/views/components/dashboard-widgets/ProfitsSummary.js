import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, CardBody, Col, Row, UncontrolledTooltip } from 'reactstrap';
import FalconCardHeader from '../../../template/components/common/FalconCardHeader';
import Flex from '../../../template/components/common/Flex';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';

const WeeklySales = ({ data, title, informationMessage }) => {
  return (
    <Card className="h-md-100">
      <FalconCardHeader
        className="pb-0"
        title={
          <>
            {title}
            <FontAwesomeIcon
              icon={['far', 'question-circle']}
              transform="shrink-1"
              className="text-400"
              id="weeklySalesTooltip"
            />
            <UncontrolledTooltip placement="bottom" target="weeklySalesTooltip">
              {informationMessage}
            </UncontrolledTooltip>
          </>
        }
        light={false}
        titleTag="h6"
      />
      <CardBody tag={Flex} align="end">
        <Row className="flex-grow-1">
          <Col>
            <div className="fs-4 font-weight-normal text-sans-serif text-700 line-height-1 mb-1">{data.length}</div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

WeeklySales.propTypes = { data: PropTypes.array.isRequired };

export default WeeklySales;
