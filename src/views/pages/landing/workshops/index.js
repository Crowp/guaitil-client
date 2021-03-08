import React, { useEffect, useState } from 'react';
import Loader from '../../../../template/components/common/Loader';
import { isIterableArray } from '../../../../template/helpers/utils';
import NavbarStandard from '../../../../template/components/navbar/NavbarStandard';
import usePagination from '../../../../template/hooks/usePagination';
import Section from '../../../../template/components/common/Section';
import Starter from '../../../components/extra/Starter';
import { useHistory } from 'react-router-dom';
import { LocalEnum, RouteMap } from '../../../../constants';
import { useLocalByLocalTypeEffect } from '../../../hooks';
import { LocalsBox } from '../components/LocalsBox';

const LodginContainer = ({ match, location }) => {
  const history = useHistory();

  const [localsId, setLocalIds] = useState([]);
  const { isRequesting, items: locals } = useLocalByLocalTypeEffect(LocalEnum.Workshop);
  const { data: paginationData, meta: paginationMeta, handler: paginationHandler } = usePagination(localsId, 4);

  useEffect(() => {
    setLocalIds(locals.map(local => local.id));
  }, [locals, setLocalIds]);

  const paginationProps = {
    paginationData,
    paginationMeta,
    paginationHandler
  };
  return (
    <>
      <NavbarStandard location={location} match={match} hasColor />
      <Section>
        {isRequesting ? (
          <Loader />
        ) : isIterableArray(locals) ? (
          <LocalsBox
            locals={locals}
            type="workshop"
            onIndividualRoute={RouteMap.Home.workshopsIndividual}
            {...paginationProps}
          />
        ) : (
          <Starter
            action={() => history.push(RouteMap.Home.root())}
            actionName="Volver a la pagina principal"
            title="No hay talleres registrados"
            description="Estamos trabajando en ello..."
          />
        )}
      </Section>
    </>
  );
};

export default React.memo(LodginContainer);
