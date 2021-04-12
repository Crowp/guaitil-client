import React from 'react';
import Section from '../../../../../template/components/common/Section';
import Process from '../../../../../template/components/landing/Process';
import SectionHeader from '../../../../../template/components/landing/SectionHeader';
import processList from '../../../../../template/data/feature/processList';
import { isIterableArray } from '../../../../../template/helpers/utils';
import { LazyLoad } from 'react-observer-api';

const Processes = () => (
  <Section fluid>
    <SectionHeader
      title="Guaitil, cuna de la artesanía Chorotega"
      subtitle="Descubre su cultura: arte, tradición y sabores originarios"
    />
    {isIterableArray(processList) &&
      processList.map((item, index) => (
        <LazyLoad key={index} as="span">
          <Process {...item} />
        </LazyLoad>
      ))}
  </Section>
);

export default Processes;
