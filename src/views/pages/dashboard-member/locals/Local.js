import React from 'react';
import { Col, Row } from 'reactstrap';
import Weather from '../../../../template/components/dashboard-alt/Weather';
import TotalOrder from '../../../../template/components/dashboard-alt/TotalOrder';
import MarketShare from '../../../../template/components/dashboard-alt/MarketShare';
import BestSellingProducts from '../../../../template/components/dashboard-alt/BestSellingProducts';
import SharedFiles from '../../../../template/components/dashboard-alt/SharedFiles';
import weeklySales from '../../../../template/data/dashboard/weeklySales';
import totalOrder from '../../../../template/data/dashboard/totalOrder';
import marketShare from '../../../../template/data/dashboard/marketShare';
import weather from '../../../../template/data/dashboard/weather';
import products from '../../../../template/data/dashboard/products';
import files from '../../../../template/data/dashboard/files';
import ProductManagment from '../product';

import ProfitsSummary from '../../../components/dashboard-widgets/ProfitsSummary';
import useProductsEffect from '../../../hooks/useProductsEffect';
import { selectProducts } from '../../../../selectors/product/ProductSelector';

const Local = ({
  match: {
    params: { localId }
  }
}) => {
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
        <Col md={6} className="col-xxl-3 mb-3 pl-md-2 pr-xxl-2">
          <TotalOrder data={totalOrder} />
        </Col>
        <Col md={6} className="col-xxl-3 mb-3 pr-md-2 pl-xxl-2">
          <MarketShare data={marketShare} localId={localId} />
        </Col>
        <Col md={6} className="col-xxl-3 mb-3 pl-md-2">
          <Weather data={weather} className="h-md-100" />
        </Col>
      </Row>

      <Row noGutters>
        <Col className="mb-3">
          <ProductManagment localId={localId} />
        </Col>
      </Row>
      <Row noGutters>
        <Col lg={7} xl={8} className="mb-3 pr-lg-2 mb-3">
          <BestSellingProducts products={products} />
        </Col>
        <Col lg={5} xl={4} className="mb-3 pl-lg-2">
          <SharedFiles files={files} />
        </Col>
      </Row>
    </>
  );
};

export default React.memo(Local);
