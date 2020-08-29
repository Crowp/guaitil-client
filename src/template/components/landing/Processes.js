import React from 'react';
import processList from '../../data/feature/processList';
import Section from '../common/Section';
import Process from './Process';
import SectionHeader from './SectionHeader';
import { isIterableArray } from '../../helpers/utils';

const Processes = () => (
  <Section>
    <SectionHeader title="¿Qué somos?" subtitle="La cuna de la artesanía Chorotega" />
    {isIterableArray(processList) && processList.map((process, index) => <Process key={index} {...process} />)}
  </Section>
);

export default Processes;
