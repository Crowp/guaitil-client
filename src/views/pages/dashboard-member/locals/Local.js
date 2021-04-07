import React from 'react';
import { Col, Row } from 'reactstrap';

import MarketShare from '../../../../template/components/dashboard-alt/MarketShare';
import marketShare from '../../../../template/data/dashboard/marketShare';
import ProductManagment from '../product';

import ProfitsSummary from '../../../components/dashboard-widgets/ProfitsSummary';
import useProductsEffect from '../../../hooks/useProductsEffect';
import { selectProducts } from '../../../../selectors/product/ProductSelector';
import { useParams } from 'react-router-dom';

const Local = () => {
  const { localId } = useParams();
  const { items } = useProductsEffect(selectProducts, localId);
  return (
    <>
      <Row noGutters>
        <Col md={6} className="col-xxl-3 mb-3 pr-md-2">
          <ProfitsSummary
            informationMessage="Total de producto en el local"
            title="Cantidad de productos"
            data={items}
          />
        </Col>
        <Col md={6} className="col-xxl-3 mb-3 pr-md-2 pl-xxl-2">
          <MarketShare data={marketShare} localId={localId} />
        </Col>
      </Row>

      <Row noGutters>
        <Col className="mb-3">
          <ProductManagment localId={localId} />
        </Col>
      </Row>
    </>
  );
};

export default React.memo(Local);
