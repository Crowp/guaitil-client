import React from 'react';
import { useHistory } from 'react-router-dom';
import Starter from '../components/extra/Starter';
import PeopleTable from './PeopleTable';

const PeopleManagement = () => {
  const history = useHistory();
  const people = [];
  return people.length ? (
    <PeopleTable people={people} />
  ) : (
    <Starter
      action={() => history.push('people/create')}
      actionName="Registra una Persona"
      title="Administración de Personas"
      description="No hay personas registradas aún!"
    />
  );
};

export default PeopleManagement;
