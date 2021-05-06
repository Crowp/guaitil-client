/* eslint-disable react/display-name */
import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import Flex from '../../../../template/components/common/Flex';

import { TeamItem } from './TeamItem';
import './Team.css';
import teamData from './TeamData';

import FooterSection from '../home/sections/FooterSection';
import UnaLogo from '../../../../template/assets/img/logos/una.png';

export default () => {
  return (
    <>
      <div className="py-5 team3 bg-light mt-5">
        <Container>
          <Flex tag={Row} justify="center" className="mb-4">
            <Col md={7} className="text-center">
              <h3 className="mb-3">Experienced & Professional Team</h3>
              <h6 className="subtitle font-weight-normal">
                You can relay on our amazing features list and also our customer services will be great experience for
                you without doubt and in no-time
              </h6>
            </Col>
          </Flex>
          <Flex tag={Row} justify="center">
            {teamData.map((item, index) => (
              <TeamItem {...item} key={`team-member-${index}`} />
            ))}
          </Flex>
        </Container>
      </div>
      <FooterSection />
    </>
  );
};
