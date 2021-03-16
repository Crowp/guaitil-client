import React from 'react';
import { useSelector } from 'react-redux';
import Loader from '@/template/components/common/Loader';
import { selectAuthMemberId } from '../../../../selectors/auth/AuthSelector';
import LocalItem from '../../../components/locals/LocalItem';
import useLocalsByMemberId from '../../../hooks/useLocalsByMemberId';

const LocalsComponent = () => {
  const idMember = useSelector(selectAuthMemberId);
  const { isRequesting, items: locals } = useLocalsByMemberId(state => state.locals, idMember);
  console.log(locals);
  return isRequesting ? (
    <Loader />
  ) : (
    locals.map((local, index) => <LocalItem local={local} key={`local-${local.id}-${index}`} />)
  );
};

export default React.memo(LocalsComponent);
