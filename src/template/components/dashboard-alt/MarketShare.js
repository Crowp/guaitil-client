import React from 'react';
import PropTypes from 'prop-types';
import { isIterableArray } from '../../helpers/utils';
import MarketShareItem from './MarketShareItem';
import { Card, CardBody, Col, Row } from 'reactstrap';
import 'echarts/lib/chart/pie';
import useProductsEffect from '../../../views/hooks/useProductsEffect';
import {
  selectProductOthers,
  selectProductHandicraft,
  selectProductFood
} from '../../../selectors/product/ProductSelector';

const MarketShare = ({ title = 'Productos por categoría', localId }) => {
  const { items: others } = useProductsEffect(selectProductOthers, localId);
  const { items: foods } = useProductsEffect(selectProductFood, localId);
  const { items: handicraft } = useProductsEffect(selectProductHandicraft, localId);

  const data1 = [
    { quantity: foods.length, name: 'Comidas', color: '#2c7be5' },
    { quantity: handicraft.length, name: 'Manualidades', color: '#2c7be5' },
    { quantity: others.length, name: 'Otros', color: '#27bcfd' }
  ];

  return (
    <Card className="h-md-100">
      <CardBody>
        <Row noGutters className="h-100 justify-content-between">
          <Col xs={5} sm={6} className="col-xxl pr-2">
            <h6 className="mt-1">{title}</h6>
            <div className="fs--2 mt-3">
              {isIterableArray(data1) && data1.map((data, index) => <MarketShareItem data={data} key={index} />)}
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

MarketShare.propTypes = { data: PropTypes.array.isRequired };

export default MarketShare;
