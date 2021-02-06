import { useSelector } from 'react-redux';

const useGalleryState = (selector = state => state.gallery) => useSelector(state => selector(state));

export default useGalleryState;
