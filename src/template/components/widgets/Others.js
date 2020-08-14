import React from 'react';
import WidgetsSectionTitle from './WidgetsSectionTitle';
import { Row, Col } from 'reactstrap';
import SettingsDangerZone from '../Settings/SettingsDangerZone';
import EmailDetailHeader from '../email/EmailDetailHeader';
import DashBoardDepositStatus from '../dashboard/DashboardDepositStatus';
import EventCreateFooter from '../event/EventCreateFooter';
import Weather from '../dashboard-alt/Weather';
import ActiveUsersMap from '../dashboard/ActiveUsersMap';
import SpaceWarning from '../dashboard-alt/SpaceWarning';
import BirthdayNotice from '../feed/BirthdayNotice';

import weather from '../../data/dashboard/weather';

const Others = () => (
  <>
    <WidgetsSectionTitle
      icon="folder-plus"
      title="Others"
      subtitle="Get more awesome cards for showing your different types of content.."
      transform="shrink-2"
    />
    <Row>
      <Col xs={12} className="col-xxl-8 pr-xl-2 mb-3">
        <DashBoardDepositStatus />
        <EmailDetailHeader />
        <EventCreateFooter />
      </Col>
      <Col lg={6} className="col-xxl-4 pl-xl-2 mb-3">
        <SettingsDangerZone className="h-100" />
      </Col>
    </Row>
    <Row>
      <Col xl={5} className="col-xxl-4 pr-xl-2">
        <Weather data={weather} className="mb-3" />
        <SpaceWarning className="mb-3" />
        <BirthdayNotice name="Emma Watson" profileLink="/pages/profile" />
      </Col>
      <Col xl={7} className="col-xxl-8 pl-xl-2 mb-3 mb-lg-0">
        <ActiveUsersMap />
      </Col>
    </Row>
  </>
);

export default Others;
