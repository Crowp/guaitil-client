import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import Starter from '../../../components/extra/Starter';
import { isIterableArray } from '../../../../template/helpers/utils';
import ReviewsMemberTable from './ReviewsMemberTable';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllreviews } from '../../../../selectors/productReview/ProductReviewSelector';
import { selectRequesting } from '../../../../selectors/requesting/RequestingSelector';
import ProductReviewAction from '../../../../stores/productReview/ProductReviewAction';
import { Col, Row } from 'reactstrap';

const ReviewsManagment = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const reviews = useSelector(selectAllreviews);
  const isRequesting = useSelector(state => selectRequesting(state, [ProductReviewAction.REQUEST_PRODUCT_REVIEW]));

  useEffect(() => {
    dispatch(ProductReviewAction.getProductReviewsByAuth());
  }, [dispatch]);

  return isRequesting ? (
    <Row className="min-vh-75 h-75">
      <Col className="d-flex justify-content-center align-items-center">
        <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" color="primary" />
      </Col>
    </Row>
  ) : isIterableArray(reviews) ? (
    <ReviewsMemberTable reviews={reviews} />
  ) : (
    <Starter
      action={() => history.push('member/locals')}
      actionName="Ir a locales"
      title="No hay revisiones"
      description="No hay revisiones, crea un producto en un local!"
    />
  );
};

export default ReviewsManagment;
