import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Section from '../../../../template/components/common/Section';
import ContentWithAsideLayout from '../../../../template/layouts/ContentWithAsideLayout';
import '../../../../template/assets/styles-css/header-form/dashboard.css';
import Loader from '../../../../template/components/common/Loader';
import ErrorAction from '../../../../stores/error/ErrorAction';
import { useDispatch } from 'react-redux';
import LocalDetailBanner from './LocalDetailBanner';
import { RouteMap } from '../../../../constants';
import LocalDetailContent from './LocalDetailContent';
import LocalDetailAside from './LocalDetailAside';
import { useLocalByIdEffect } from '../../../hooks';

const LocalDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const { local, isRequesting, hasErrors } = useLocalByIdEffect(id);

  const isEmptyObject = !Object.keys(local).length;

  useEffect(() => {
    if (!isRequesting && isEmptyObject && hasErrors) {
      history.push(RouteMap.Home.root());
      dispatch(ErrorAction.clearAll());
    }
  }, [isRequesting, hasErrors, dispatch, history, isEmptyObject]);

  return isRequesting || isEmptyObject ? (
    <Loader />
  ) : (
    <Section>
      <ContentWithAsideLayout
        banner={<LocalDetailBanner {...local.localDescription} multimedia={local.multimedia} />}
        aside={<LocalDetailAside {...local.localDescription} />}
      >
        <LocalDetailContent description={local.localDescription.description} id={local.id} />
      </ContentWithAsideLayout>
    </Section>
  );
};

export default React.memo(LocalDetail);
