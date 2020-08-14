import React, { createRef, Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardBody, Col, CustomInput, InputGroup, Row } from 'reactstrap';
import FalconCardHeader from '../common/FalconCardHeader';
import ButtonIcon from '../common/ButtonIcon';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import BootstrapTable from 'react-bootstrap-table-next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getPaginationArray } from '../../helpers/utils';
import SelectRowInput from './SelectRowInput';
import { Link } from 'react-router-dom';

const selectRow = onSelect => ({
  mode: 'checkbox',
  columnClasses: 'py-2 align-middle',
  clickToSelect: false,
  selectionHeaderRenderer: ({ mode, ...rest }) => <SelectRowInput type="checkbox" {...rest} />,
  selectionRenderer: ({ mode, ...rest }) => <SelectRowInput type={mode} {...rest} />,
  headerColumnStyle: { border: 0, verticalAlign: 'middle' },
  selectColumnStyle: { border: 0, verticalAlign: 'middle' },
  onSelect: onSelect,
  onSelectAll: onSelect
});

const Table = props => {
  const { options, columns, items, reference, onSelect } = props;
  const handleNextPage = ({ page, onPageChange }) => () => {
    onPageChange(page + 1);
  };

  const handlePrevPage = ({ page, onPageChange }) => () => {
    onPageChange(page - 1);
  };
  return (
    <PaginationProvider pagination={paginationFactory(options)}>
      {({ paginationProps, paginationTableProps }) => {
        const lastIndex = paginationProps.page * paginationProps.sizePerPage;
        return (
          <Fragment>
            <div className="table-responsive">
              <BootstrapTable
                ref={reference}
                bootstrap4
                keyField="id"
                data={items}
                columns={columns}
                selectRow={selectRow(onSelect)}
                bordered={false}
                classes="table-dashboard table-striped table-sm fs--1 border-bottom border-200 mb-0 table-dashboard-th-nowrap"
                rowClasses="btn-reveal-trigger border-top border-200"
                headerClasses="bg-200 text-900 border-y border-200"
                {...paginationTableProps}
              />
            </div>
            <Row noGutters className="px-1 py-3 flex-center">
              <Col xs="auto">
                <Button
                  color="falcon-default"
                  size="sm"
                  onClick={handlePrevPage(paginationProps)}
                  disabled={paginationProps.page === 1}
                >
                  <FontAwesomeIcon icon="chevron-left" />
                </Button>
                {getPaginationArray(paginationProps.totalSize, paginationProps.sizePerPage).map(pageNo => (
                  <Button
                    color={paginationProps.page === pageNo ? 'falcon-primary' : 'falcon-default'}
                    size="sm"
                    className="ml-2"
                    onClick={() => paginationProps.onPageChange(pageNo)}
                    key={pageNo}
                  >
                    {pageNo}
                  </Button>
                ))}
                <Button
                  color="falcon-default"
                  size="sm"
                  className="ml-2"
                  onClick={handleNextPage(paginationProps)}
                  disabled={lastIndex >= paginationProps.totalSize}
                >
                  <FontAwesomeIcon icon="chevron-right" />
                </Button>
              </Col>
            </Row>
          </Fragment>
        );
      }}
    </PaginationProvider>
  );
};

Table.propTypes = {
  onSelect: PropTypes.func.isRequired,
  reference: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
  options: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired
};

export default Table;
