/* eslint-disable react/display-name */
import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import Flex from '../../../../template/components/common/Flex';

import { TeamItem } from './TeamItem';
import './Team.css';
import teamData from './TeamData';

import FooterSection from '../home/sections/FooterSection';

export default () => {
  return (
    <>
      <div className="py-5 team3 bg-light mt-5">
        <Container>
          <Flex tag={Row} justify="center" className="mb-4">
            <Col md={7} className="text-center">
              <h3 className="mb-3">Equipo de desarrollo</h3>
              <h6 className="subtitle font-weight-normal">
                Estudiantes de la Universidad Nacional sede Chorotega campus Nicoya encargados de desarrollar la
                aplicación para la asociación integral de Guiaitil
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
