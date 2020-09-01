import React, { useState, useEffect } from 'react';
import { Col, Row } from 'reactstrap';
import FormEditSteps from './components/edit/FormEditSteps';
import Section from '../components/common/Section';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { isIterableArray } from '../../template/helpers/utils';
import LocalProvider from '../providers/LocalProvider';
import LocalAction from '../../stores/local/LocalAction';

const EditLocal = ({
  match: {
    params: { id }
  }
}) => {
  const [local, setLocal] = useState({});
  const dispatch = useDispatch();
  const { locals } = useSelector(state => state);
  useEffect(() => {
    if (isIterableArray(locals)) {
      const [localEdit] = locals.filter(lcal => lcal.id === Number(id));
      setLocal(localEdit);
    } else {
      dispatch(LocalAction.getLocalById(id));
    }
  }, [locals, id, dispatch]);

  return (
    <Section className="py-0">
      <Row className="flex-center align-items-start min-vh-75 py-3">
        <Col sm={10} lg={7} className="col-xxl-5">
          <LocalProvider defaultLocal={local}>
            <FormEditSteps />
          </LocalProvider>
        </Col>
      </Row>
    </Section>
  );
};

export default EditLocal;
