import React from 'react';
import PropTypes from 'prop-types';
import Flex from '../common/Flex';
import Dot from '../common/Dot';

const MarketShareItem = ({ data }) => (
  <Flex justify="between" align="center" className="mb-1">
    <Flex align="center">
      <Dot style={{ backgroundColor: data.color }} />
      <span className="font-weight-semi-bold">{data.name}</span>
    </Flex>
    <div className="d-xxl-none">{data.quantity}</div>
  </Flex>
);

MarketShareItem.propsType = {
  data: PropTypes.object.isRequired
};

export default MarketShareItem;
