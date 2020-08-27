import React from 'react';

const SelectRowInput = ({ indeterminate, rowIndex, ...rest }) => (
  <div className="custom-control custom-checkbox">
    <input
      className="custom-control-input"
      {...rest}
      onChange={() => {}}
      ref={input => {
        if (input) input.indeterminate = indeterminate;
      }}
    />
    <label className="custom-control-label" />
  </div>
);

export default SelectRowInput;
