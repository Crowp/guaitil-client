import React from 'react';
import Switch from 'react-switch';
import { useIsRequesting } from '../../../hooks';
import LocalAction from '../../../../stores/local/LocalAction';

const ShowFormatter = onChange => (dataField, { id, show }) => {
  return <SwitchFormatter show={show} onChange={onChange(id)} />;
};

const SwitchFormatter = ({ show, onChange }) => {
  const isShowLocalRequesting = useIsRequesting([LocalAction.REQUEST_LOCAL_SHOW]);
  return <Switch checked={show} disabled={isShowLocalRequesting} draggable={false} onChange={onChange} />;
};

export default ShowFormatter;
