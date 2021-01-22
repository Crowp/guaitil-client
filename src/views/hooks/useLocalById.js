import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { isIterableArray } from '@/template/helpers/utils';
import LocalAction from '../../stores/local/LocalAction';
import useIsRequesting from './useIsRequesting';
import useHasErrors from './useHasErrors';

const useLocalById = id => {
  const dispatch = useDispatch();
  const [local, setLocal] = useState({});
  const [load, setLoad] = useState(false);
  const locals = useSelector(state => state.locals);

  const isRequesting = useIsRequesting([LocalAction.REQUEST_LOCAL_BY_ID]);
  const hasErrors = useHasErrors([LocalAction.REQUEST_LOCAL_BY_ID_FINISHED]);

  useEffect(() => {
    if (isIterableArray(locals) && id) {
      const [localFounded = {}] = locals.filter(item => item.id === Number(id));
      if (localFounded) {
        setLocal(localFounded);
      }
    } else if (!load && id) {
      dispatch(LocalAction.getLocalById(id));
      setLoad(true);
    }
  }, [dispatch, id, locals, load]);

  return { isRequesting, local, hasErrors, locals };
};

export default useLocalById;
