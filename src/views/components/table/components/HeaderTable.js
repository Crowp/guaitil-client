import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Row, CustomInput, InputGroup } from 'reactstrap';
import ButtonIcon from '@/template/components/common/ButtonIcon';
import Flex from '@/template/components/common/Flex';

const HeaderTable = ({ searchBarIsOpen, SearchBar, searchProps, isSelected, title, actions }) => (
  <Row className="align-items-center">
    <Col sm={6} md={6} lg={7} xl={8}>
      <Flex align="center" style={{ height: 46 }}>
        <h5 className="mr-3">{title}</h5>
        {searchBarIsOpen && <SearchBar {...searchProps} />}
      </Flex>
    </Col>
    <Col sm={6} md={6} lg={5} xl={4} className="text-center text-sm-right">
      {isSelected ? (
        <InputGroup size="sm" className="input-group">
          <CustomInput type="select" id="bulk-select">
            <option>Bulk actions</option>
            <option value="Delete">Delete</option>
            <option value="Archive">Archive</option>
          </CustomInput>
          <Button color="success" size="sm" className="ml-2">
            Apply
          </Button>
        </InputGroup>
      ) : (
        actions.map(({ icon, text, onClick, color }, index) => (
          <ButtonIcon
            key={`table-header-button-${index}`}
            icon={icon}
            transform="shrink-3 down-2"
            color={color}
            size="sm"
            className="m-1 shadow-sm rounded"
            onClick={onClick}
          >
            {text}
          </ButtonIcon>
        ))
      )}
    </Col>
  </Row>
);

HeaderTable.propTypes = {
  title: PropTypes.string.isRequired,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
      text: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
      color: PropTypes.string
    })
  ).isRequired
};

export default HeaderTable;
