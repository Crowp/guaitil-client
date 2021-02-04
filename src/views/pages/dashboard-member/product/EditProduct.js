import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { selectAuthMemberId } from '../../../../selectors/auth/AuthSelector';
import LocalAction from '../../../../stores/local/LocalAction';
import FormProductContainer from './component/FormProductContainer';
import useProductByIdEffect from '../../../hooks/useProductsByIdEffect';
import { useErrorRedirect } from '../../../hooks';
import { RouteMap } from '../../../../constants';

const EditProduct = ({
  match: {
    params: { id, idLocal }
  }
}) => {
  const { product, isRequesting: isProductRequesting, hasErrors: hasProductErrors } = useProductByIdEffect(id);
  const validateError = !isProductRequesting || hasProductErrors;
  useErrorRedirect(RouteMap.Product.individualLocalRoot(), validateError);

  const dispatch = useDispatch();
  const idMember = useSelector(selectAuthMemberId);

  const isEmptyObject = !Object.keys(product).length;

  useEffect(() => {
    dispatch(LocalAction.getLocalsByMemberId(idMember));
  }, [dispatch, idMember]);

  return (
    <FormProductContainer idLocal={idLocal} defaultItem={product} isLoading={isProductRequesting || isEmptyObject} />
  );
};

export default React.memo(EditProduct);
