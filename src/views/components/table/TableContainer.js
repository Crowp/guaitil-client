import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody } from 'reactstrap';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import Table from './Table';
import HeaderTable from './components/HeaderTable';

const { SearchBar } = Search;

const TableContainer = ({ items, columns, title, actions, searchBarIsOpen, rowEvents }) => {
  const table = createRef();
  const options = {
    custom: true,
    sizePerPage: 10,
    totalSize: items.length
  };

  return (
    <ToolkitProvider
      keyField="id"
      data={items}
      columns={columns}
      bootstrap4
      search={{
        searchFormatted: true
      }}
    >
      {({ baseProps, searchProps }) => {
        const headerProps = { SearchBar, searchProps, title, actions, searchBarIsOpen };
        return (
          <Card className="mb-3 mt-4">
            <HeaderTable {...headerProps} />
            <CardBody className="p-0">
              <Table rowEvents={rowEvents} reference={table} baseProps={baseProps} options={options} />
            </CardBody>
          </Card>
        );
      }}
    </ToolkitProvider>
  );
};

TableContainer.propTypes = {
  items: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
      text: PropTypes.string.isRequired,
      onClick: PropTypes.func,
      color: PropTypes.string
    })
  ).isRequired
};

export default TableContainer;
