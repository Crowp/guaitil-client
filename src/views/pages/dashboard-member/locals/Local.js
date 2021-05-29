import React from 'react';
import { Col, Row } from 'reactstrap';
import ProductManagment from '../product';
import useProductsEffect from '../../../hooks/useProductsEffect';
import {
  selectProductOthers,
  selectProductHandicraft,
  selectProductFood,
  selectProducts
} from '../../../../selectors/product/ProductSelector';
import CardSummary from '../../../../views/components/dashboard-widgets/CardSummary';

import { useParams } from 'react-router-dom';
import { faDrumstickBite, faMortarPestle, faPlusCircle, faFolder } from '@fortawesome/free-solid-svg-icons';

const Local = () => {
  const { localId } = useParams();
  const { items: products } = useProductsEffect(selectProducts, localId);
  const { items: others } = useProductsEffect(selectProductOthers, localId);
  const { items: foods } = useProductsEffect(selectProductFood, localId);
  const { items: handicraft } = useProductsEffect(selectProductHandicraft, localId);
  return (
    <>
      <div className="card-deck">
        <CardSummary
          color="white"
          iconCard={faFolder}
          title="Total de productos registrados"
          titleColor="text-white"
          bgColor="bg-info"
        >
          {products.length}
        </CardSummary>
        <CardSummary
          color="white"
          iconCard={faDrumstickBite}
          title="Comida"
          titleColor="text-white"
          bgColor="bg-warning"
        >
          {foods.length}
        </CardSummary>
      </div>
      <div className="card-deck">
        <CardSummary
          color="white"
          iconCard={faMortarPestle}
          bgColor="bg-secondary"
          title="Manualidades"
          titleColor="text-white"
        >
          {handicraft.length}
        </CardSummary>
        <CardSummary color="white" iconCard={faPlusCircle} bgColor="bg-danger" title="Otros" titleColor="text-white">
          {others.length}
        </CardSummary>
      </div>

      <Row noGutters>
        <Col className="mb-3">
          <ProductManagment localId={localId} />
        </Col>
      </Row>
    </>
  );
};

export default React.memo(Local);
