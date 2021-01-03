import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AuthAction from '../../stores/auth/AuthAction';

const useVerifyLogin = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(AuthAction.verifyLogin());
  }, [dispatch]);
};

export default useVerifyLogin;
