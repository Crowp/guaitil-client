import React, { useState, useEffect } from 'react';
import { Col, Row, Spinner } from 'reactstrap';
import FormSteps from './components/edit/FormSteps';
import Section from '../../../../template/components/common/Section';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { isIterableArray } from '../../../../template/helpers/utils';
import { selectRequesting } from '../../../../selectors/requesting/RequestingSelector';
import ProductReviewAction from '../../../../stores/productReview/ProductReviewAction';
import { hasErrors } from '../../../../selectors/error/ErrorSelector';
import ErrorAction from '../../../../stores/error/ErrorAction';
import { useHistory } from 'react-router-dom';
import ReviewProvider from '../../../providers/ReviewProvider';

const EditReview = ({
  match: {
    params: { id }
  }
}) => {
  const [review, setReview] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();
  const reviews = useSelector(state => state.productReviews);

  const isRequesting = useSelector(state =>
    selectRequesting(state, [ProductReviewAction.REQUEST_PRODUCT_REVIEW_BY_ID])
  );
  const exitsErrors = useSelector(state => hasErrors(state, [ProductReviewAction.REQUEST_PRODUCT_REVIEW_BY_ID]));
  const isEmptyObject = !Object.keys(review).length;

  useEffect(() => {
    if (isIterableArray(reviews)) {
      const [reviewEdit] = reviews.filter(item => item.id === Number(id));
      setReview(reviewEdit);
    } else {
      dispatch(ProductReviewAction.getProductReviews());
    }
  }, [reviews, id, dispatch]);

  useEffect(() => {
    if (!isRequesting && isEmptyObject && exitsErrors) {
      history.push('/admin/reviews');
      dispatch(ErrorAction.clearAll());
    }
  }, [isRequesting, exitsErrors, dispatch, history, isEmptyObject]);

  return isRequesting || isEmptyObject ? (
    <Row className="min-vh-75 h-75">
      <Col className="d-flex justify-content-center align-items-center">
        <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" color="primary" />
      </Col>
    </Row>
  ) : (
    <Section className="py-0">
      <Row className="flex-center align-items-start min-vh-75 py-3">
        <Col sm={10} lg={7} className="col-xxl-5">
          <ReviewProvider defaultReview={review}>
            <FormSteps idLocal={id} />
          </ReviewProvider>
        </Col>
      </Row>
    </Section>
  );
};

export default React.memo(EditReview);
