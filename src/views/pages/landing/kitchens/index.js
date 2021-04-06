import React, { useEffect, useState } from 'react';
import Loader from '../../../../template/components/common/Loader';
import { isIterableArray } from '../../../../template/helpers/utils';
import usePagination from '../../../../template/hooks/usePagination';
import Section from '../../../../template/components/common/Section';
import { useHistory } from 'react-router-dom';
import Starter from '../../../components/extra/Starter';
import { LocalsBox } from '../components/LocalsBox';
import { LocalEnum, RouteMap } from '../../../../constants';
import { useLocalByLocalTypeEffect } from '../../../hooks';

const LodginContainer = () => {
  const history = useHistory();
  const [localsId, setLocalIds] = useState([]);

  const { isRequesting, items: locals } = useLocalByLocalTypeEffect(LocalEnum.Kitchen);
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
    <Section>
      {isRequesting ? (
        <Loader />
      ) : isIterableArray(locals) ? (
        <LocalsBox
          locals={locals}
          type="kitchen"
          onIndividualRoute={RouteMap.Home.kitchenIndividual}
          {...paginationProps}
        />
      ) : (
        <Starter
          action={() => history.push(RouteMap.Home.root())}
          actionName="Volver a la página principal"
          title="No hay cocinas registradas"
          description="Estamos trabajando en ello..."
        />
      )}
    </Section>
  );
};

export default React.memo(LodginContainer);
