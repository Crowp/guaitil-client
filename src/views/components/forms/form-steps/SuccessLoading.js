import React from 'react';
import { Row, Col } from 'reactstrap';

import Loader from '@/template/components/common/Loader';
import Flex from '@/template/components/common/Flex';

const SuccessLoading = () => (
  <>
    <Row className="min-vh-25 h-25">
      <Flex tag={Col} justify="center" align="center">
        <Loader />
      </Flex>
    </Row>
    <h4 className="mb-1">Procesando...</h4>
    <p className="fs-0">Espere uno momento</p>
  </>
);

export default SuccessLoading;
