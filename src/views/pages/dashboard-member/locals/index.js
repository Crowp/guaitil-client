import React from 'react';
import { useSelector } from 'react-redux';
import Loader from '@/template/components/common/Loader';
import { selectAuthMemberId } from '../../../../selectors/auth/AuthSelector';
import useLocalsByMemberId from '../../../hooks/useLocalsByMemberId';
import LocalGrid from '../../landing/components/LocalGrid';
import { RouteMap } from '../../../../constants';

const LocalsComponent = () => {
  const idMember = useSelector(selectAuthMemberId);
  const { isRequesting, items: locals } = useLocalsByMemberId(state => state.locals, idMember);
  return isRequesting ? (
    <Loader />
  ) : (
    locals.map((local, index) => (
      <LocalGrid
        localUrl={RouteMap.LocalMember.root() + '/' + local.id}
        local={local}
        key={`${local.id}-local`}
        index={index}
        button="Entrar"
        md={6}
        lg={4}
      />
    ))
  );
};

export default React.memo(LocalsComponent);
