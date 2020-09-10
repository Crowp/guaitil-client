import React, { useEffect } from 'react';
import { Col, Row } from 'reactstrap';
import FormSteps from './component/create/FormSteps';
import Section from '../components/common/Section';
import ProductProvider from '../providers/ProductProvider';
import LocalAction from '../../stores/local/LocalAction';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuthMemberId } from '../../selectors/auth/AuthSelector';

const CreateProduct = ({
  match: {
    params: { id }
  }
}) => {
  const dispatch = useDispatch();

  const idMember = useSelector(selectAuthMemberId);
  const locals = useSelector(state => state.locals);
  const localSelected = locals.filter(lcal => lcal.id === Number(id));
  console.log(localSelected);
  useEffect(() => {
    dispatch(LocalAction.getLocalsByMemberId(idMember));
  }, [dispatch]);
  return (
    <Section className="py-0">
      <Row className="flex-center align-items-start min-vh-75 py-3">
        <Col sm={10} lg={7} className="col-xxl-5">
          <ProductProvider defaultLocal={localSelected}>
            <FormSteps />
          </ProductProvider>
        </Col>
      </Row>
    </Section>
  );
};

export default CreateProduct;
