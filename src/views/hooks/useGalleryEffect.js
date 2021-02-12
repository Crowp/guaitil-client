import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useIsRequesting from './useIsRequesting';
import useHasErrors from './useHasErrors';
import useLocalsState from './useLocalsState';
import GalleryAction from '../../stores/gallery/GalleryAction';

const useGalleryEffect = (selector = state => state.gallery) => {
  const dispatch = useDispatch();
  const isRequesting = useIsRequesting([GalleryAction.REQUEST_GALLERY]);
  const gallery = useLocalsState(selector);
  const hasErrors = useHasErrors([GalleryAction.REQUEST_GALLERY_FINISHED]);
  useEffect(() => {
    dispatch(GalleryAction.getGalery());
  }, [dispatch]);
  return { isRequesting, multimedia: gallery?.multimedia || [], hasErrors };
};

export default useGalleryEffect;
