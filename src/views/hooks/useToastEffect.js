import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import ToastsAction from '../../stores/toasts/ToastsAction';

const useToastEffect = () => {
  const dispatch = useDispatch();
  const toasts = useSelector(state => state.toasts.items);
  useEffect(() => {
    toasts.forEach(({ message, id, type }) => {
      toast(message, { onOpen: () => dispatch(ToastsAction.removeById(id)), type });
    });
  }, [toasts, dispatch]);
};

export default useToastEffect;
