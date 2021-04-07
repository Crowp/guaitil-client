import React from 'react';
import Switch from 'react-switch';
import { useIsRequesting } from '../../../hooks';

const ShowFormatter = (onChange, actionType) => (dataField, { id, show }) => {
  return <SwitchFormatter show={show} onChange={onChange(id)} actionType={actionType} />;
};

const SwitchFormatter = ({ show, onChange, actionType }) => {
  const isShowLocalRequesting = useIsRequesting([actionType]);
  return <Switch checked={show} disabled={isShowLocalRequesting} draggable={false} onChange={onChange} />;
};

export default ShowFormatter;
