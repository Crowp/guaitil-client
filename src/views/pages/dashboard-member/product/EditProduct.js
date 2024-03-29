import React from 'react';
import FormProductContainer from './component/FormProductContainer';
import useProductByIdEffect from '../../../hooks/useProductsByIdEffect';
import { useErrorRedirect } from '../../../hooks';
import { RouteMap } from '../../../../constants';
import { useParams } from 'react-router';

const EditProduct = () => {
  const { id, localId } = useParams();
  const { product, isRequesting, hasErrors: hasProductErrors } = useProductByIdEffect(Number(id));
  const validateError = !isRequesting && hasProductErrors;
  useErrorRedirect(RouteMap.LocalMember.individual(localId), validateError);

  const isEmptyObject = !Object.keys(product).length;

  return <FormProductContainer localId={localId} defaultItem={product} isLoading={isRequesting || isEmptyObject} />;
};

export default React.memo(EditProduct);
