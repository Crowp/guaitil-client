import React, { useEffect, useState } from 'react';
import Loader from '../../../../template/components/common/Loader';
import { isIterableArray } from '../../../../template/helpers/utils';
import NavbarStandard from '../../../../template/components/navbar/NavbarStandard';
import usePagination from '../../../../template/hooks/usePagination';
import Section from '../../../../template/components/common/Section';
import { useHistory } from 'react-router-dom';
import Starter from '../../../components/extra/Starter';
import { LocalsBox } from '../components/LocalsBox';
import { LocalEnum, RouteMap } from '../../../../constants';
import { useLocalByLocalTypeEffect } from '../../../hooks';

const LodginContainer = ({ match, location }) => {
  const history = useHistory();
  const [localsId, setLocalIds] = useState([]);
  const { isRequesting, items: locals } = useLocalByLocalTypeEffect(LocalEnum.Lodging);
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
            type="longing"
            onIndividualRoute={RouteMap.Home.lodgingIndividual}
            {...paginationProps}
          />
        ) : (
          <Starter
            action={() => history.push(RouteMap.Home.root())}
            actionName="Volver a la pagina principal"
            title="No hay alojamientos registrados"
            description="Estamos trabajando en ello..."
          />
        )}
      </Section>
    </>
  );
};

export default React.memo(LodginContainer);
