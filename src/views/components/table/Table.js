import React from 'react';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { Button, Col, Row } from 'reactstrap';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import BootstrapTable from 'react-bootstrap-table-next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getPaginationArray } from '@/template/helpers/utils';
import SelectRowInput from './SelectRowInput';
import './table.scss';

const selectRow = onSelect => ({
  mode: 'checkbox',
  columnClasses: 'py-2 align-middle',
  clickToSelect: false,
  selectionHeaderRenderer: ({ mode, ...rest }) => <SelectRowInput type="checkbox" {...rest} />,
  selectionRenderer: ({ mode, rowKey, ...rest }) => <SelectRowInput type={mode} {...rest} rowkey={rowKey} />,
  headerColumnStyle: { border: 0, verticalAlign: 'middle' },
  selectColumnStyle: { border: 0, verticalAlign: 'middle' },
  onSelect: onSelect,
  onSelectAll: onSelect
});

const Table = props => {
  const { baseProps, options, reference, onSelect } = props;
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
          <>
            <div className="table-responsive">
              <BootstrapTable
                ref={reference}
                {...baseProps}
                selectRow={selectRow(onSelect)}
                bordered={false}
                classes="table-dashboard table-striped table-sm fs--1 border-bottom border-200 mb-0 table-dashboard-th-nowrap"
                rowClasses="btn-reveal-trigger border-top border-200"
                headerClasses="table-header"
                {...paginationTableProps}
              />
            </div>
            <Row noGutters className="px-1 py-3 flex-center">
              <Col xs="auto">
                <Button
                  color=""
                  size="sm"
                  onClick={handlePrevPage(paginationProps)}
                  disabled={paginationProps.page === 1}
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </Button>
                {getPaginationArray(paginationProps.totalSize, paginationProps.sizePerPage).map(pageNo => (
                  <Button
                    color={paginationProps.page === pageNo ? 'primary' : 'secondary'}
                    size="sm"
                    className="ml-2 rounded"
                    onClick={() => paginationProps.onPageChange(pageNo)}
                    key={pageNo}
                  >
                    {pageNo}
                  </Button>
                ))}
                <Button
                  color=""
                  size="sm"
                  className="ml-2"
                  onClick={handleNextPage(paginationProps)}
                  disabled={lastIndex >= paginationProps.totalSize}
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </Button>
              </Col>
            </Row>
          </>
        );
      }}
    </PaginationProvider>
  );
};

Table.propTypes = {
  onSelect: PropTypes.func.isRequired,
  reference: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired
};

export default React.memo(Table);
