import React, { useEffect, useState } from 'react';
import { Card, CardBody, Row } from 'reactstrap';
import Loader from '../../../../template/components/common/Loader';
import { isIterableArray } from '../../../../template/helpers/utils';
import NavbarStandard from '../../../../template/components/navbar/NavbarStandard';
import LocalGrid from '../components/LocalGrid';
import ProductFooter from '../../../../template/components/e-commerce/product/ProductFooter';
import { useSelector, useDispatch } from 'react-redux';
import { selectRequesting } from '../../../../selectors/requesting/RequestingSelector';
import usePagination from '../../../../template/hooks/usePagination';
import Section from '../../../../template/components/common/Section';
import { useHistory } from 'react-router-dom';
import Starter from '../../../components/extra/Starter';
import LocalAction from '../../../../stores/local/LocalAction';
import { RouteMap } from '../../../../constants';

const LodginContainer = ({ match, location }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [localsId, setLocalIds] = useState([]);
  const locals = useSelector(state => state.locals);
  const isRequesting = useSelector(state => selectRequesting(state, [LocalAction.REQUEST_LOCAL_BY_LODGING]));
  const { data: paginationData, meta: paginationMeta, handler: paginationHandler } = usePagination(localsId, 4);

  useEffect(() => {
    dispatch(LocalAction.getLocalByLodging());
  }, [dispatch]);

  useEffect(() => {
    setLocalIds(locals.map(local => local.id));
  }, [locals, setLocalIds]);

  return (
    <>
      <NavbarStandard location={location} match={match} hasColor />
      <Section>
        {isRequesting ? (
          <Loader />
        ) : isIterableArray(locals) ? (
          <Card>
            <CardBody className="pb-0">
              <Row>
                {isIterableArray(locals) &&
                  locals
                    .filter(local => paginationData.includes(local.id))
                    .map((local, index) => (
                      <LocalGrid
                        localUrl={RouteMap.Home.localIndivitual(local.id)}
                        local={local}
                        key={`${local.id}-longing`}
                        index={index}
                        md={6}
                        lg={4}
                      />
                    ))}
              </Row>
            </CardBody>
            <ProductFooter meta={paginationMeta} handler={paginationHandler} />
          </Card>
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
