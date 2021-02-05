import React from 'react';
import FormProductContainer from './component/FormProductContainer';
import useProductByIdEffect from '../../../hooks/useProductsByIdEffect';
import { useErrorRedirect } from '../../../hooks';
import { RouteMap } from '../../../../constants';

const EditProduct = ({
  match: {
    params: { id, localId }
  }
}) => {
  const { product, isRequesting: isProductRequesting, hasErrors: hasProductErrors } = useProductByIdEffect(Number(id));
  const validateError = !isProductRequesting && hasProductErrors;
  useErrorRedirect(RouteMap.LocalMember.individual(localId), validateError);

  const isEmptyObject = !Object.keys(product).length;

  return (
    <FormProductContainer localId={localId} defaultItem={product} isLoading={isProductRequesting || isEmptyObject} />
  );
};

export default React.memo(EditProduct);
