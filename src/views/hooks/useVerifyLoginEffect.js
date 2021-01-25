import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AuthAction from '../../stores/auth/AuthAction';

const useVerifyLoginEffect = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(AuthAction.verifyLogin());
  }, [dispatch]);
};

export default useVerifyLoginEffect;
