import React, { Fragment, useEffect, useState } from 'react';
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
import LocalAction from '../../../../stores/local/LocalAction';
import Starter from '../../../components/extra/Starter';
import { useHistory } from 'react-router-dom';

const LodginContainer = ({ match, location }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [localsId, setLocalIds] = useState([]);
  const locals = useSelector(state => state.locals);
  const isRequesting = useSelector(state => selectRequesting(state, [LocalAction.REQUEST_LOCAL_BY_WORKSHOP]));
  const { data: paginationData, meta: paginationMeta, handler: paginationHandler } = usePagination(localsId, 4);

  useEffect(() => {
    dispatch(LocalAction.getLocalByWorkshop());
  }, [dispatch]);

  useEffect(() => {
    setLocalIds(locals.map(local => local.id));
  }, [locals, setLocalIds]);

  return isRequesting ? (
    <Loader />
  ) : isIterableArray(locals) ? (
    <Fragment>
      <NavbarStandard location={location} match={match} hasColor />
      <Section>
        <Card>
          <CardBody className="pb-0">
            <Row>
              {isIterableArray(locals) &&
                locals
                  .filter(local => paginationData.includes(local.id))
                  .map((local, index) => (
                    <LocalGrid localUrl="talleres" local={local} key={local.id} index={index} md={6} lg={4} />
                  ))}
            </Row>
          </CardBody>
          <ProductFooter meta={paginationMeta} handler={paginationHandler} />
        </Card>
      </Section>
    </Fragment>
  ) : (
    <>
      <NavbarStandard location={location} match={match} hasColor />
      <Section>
        <Starter
          action={() => history.push('/')}
          actionName="Volver a la pagina principal"
          title="No hay talleres aun"
          description="Estamos trabajando en ello"
        />
      </Section>
    </>
  );
};

export default React.memo(LodginContainer);
