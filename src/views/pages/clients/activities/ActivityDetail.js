import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment';
import { Element, scroller } from 'react-scroll';
import Slider from 'react-slick/lib';
import { Button, Card, CardBody, CardImg, Col, Media, Row } from 'reactstrap';
import NavbarStandard from '../../../../template/components/navbar/NavbarStandard';
import Section from '../../../../template/components/common/Section';
import ContentWithAsideLayout from '../../../../template/layouts/ContentWithAsideLayout';
import Calendar from '../../../../template/components/common/Calendar';
import ButtonIcon from '../../../../template/components/common/ButtonIcon';
import FalconCardHeader from '../../../../template/components/common/FalconCardHeader';
import FalconCardFooterLink from '../../../../template/components/common/FalconCardFooterLink';
import EventSummary from '../../../../template/components/event/EventSummary';
import createMarkup from '../../../../template/helpers/createMarkup';
import { isIterableArray } from '../../../../template/helpers/utils';
import '../../../../template/assets/styles-css/header-form/dashboard.css';
import defaultImage from '../../../../template/assets/img/background/default.png';
import Loader from '../../../../template/components/common/Loader';
import Map from '../../../components/map';
import { selectRequesting } from '../../../../selectors/requesting/RequestingSelector';
import { hasErrors, selectRawErrors } from '../../../../selectors/error/ErrorSelector';
import { selectActivitiesClient } from '../../../../selectors/activity/ActivitySelector';
import ErrorAction from '../../../../stores/error/ErrorAction';
import ActivityAction from '../../../../stores/activity/ActivityAction';
import { useDispatch, useSelector } from 'react-redux';

const ActivityDetailContent = ({ description }) => {
  return (
    <Card>
      <CardBody>
        <h5 className="fs-0 mb-3">Descripción</h5>
        <p>{description}</p>
        <Element name="event-map">
          <Map longitude={-85.510513} latitude={10.267172} />
        </Element>
      </CardBody>
    </Card>
  );
};

const sliderSettings = {
  infinite: true,
  speed: 500,
  dots: true,
  autoplay: true,
  lazyLoad: true,
  slidesToShow: 1,
  slidesToScroll: 1
};

export const ActivityDetailBanner = ({ activityDate, name, multimedia }) => {
  const date = moment(activityDate);
  const month = date.format('MMM');
  const day = date.format('DD');
  return (
    <Card className="mb-3">
      {isIterableArray(multimedia) ? (
        <div className="position-relative rounded-top" style={{ maxHeight: 400 }}>
          {multimedia.length === 1 ? (
            <CardImg
              top
              key="local-image"
              data-src={multimedia[0].url}
              height={400}
              data-sizes="auto"
              style={{ objectFit: 'cover' }}
              className="lazyload"
              alt={multimedia[0].fileName}
            />
          ) : (
            <Slider {...sliderSettings}>
              {multimedia.map(item => (
                <img
                  height={400}
                  style={{ objectFit: 'cover' }}
                  key={`image-activity-${item.id}`}
                  data-sizes="auto"
                  className="lazyload rounded"
                  data-src={item.url}
                  alt={item.fileName}
                />
              ))}
            </Slider>
          )}
        </div>
      ) : (
        <CardImg top src={defaultImage} height={400} style={{ objectFit: 'cover' }} alt="Card image" />
      )}
      <CardBody>
        <Row className="justify-content-between align-items-center">
          <Col>
            <Media>
              <Calendar day={day} month={month} />
              <Media body className="fs--1 ml-2">
                <h5 className="fs-0">{name}</h5>
                <p className="mb-0">Organizado por la Asociación</p>
                {/* <span className="fs-0 text-warning font-weight-semi-bold">$49.99 – $89.99</span> */}
              </Media>
            </Media>
          </Col>
          <Col md="auto" className="mt-4 mt-md-0">
            <ButtonIcon color="falcon-default" size="sm" className="mr-2" icon="share-alt">
              Compartir
            </ButtonIcon>
            <Button color="falcon-primary" size="sm" className="px-4 px-sm-5">
              Contactar
            </Button>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

const ActivityDetailAside = ({ address: { physicalAddress }, id }) => {
  const dispatch = useDispatch();
  const activitiesState = useSelector(selectActivitiesClient);
  const isRequesting = useSelector(state => selectRequesting(state, [ActivityAction.REQUEST_ACTIVITY]));

  useEffect(() => {
    dispatch(ActivityAction.getActivities());
  }, [dispatch]);

  const scrollToEventMap = e => {
    e.preventDefault();
    scroller.scrollTo('event-map', {
      smooth: true
    });
  };

  const activities = activitiesState.filter(activity => activity.id !== id);

  return (
    <>
      <Card className="mb-3 fs--1">
        <CardBody>
          <h6>Dirección</h6>
          <div className="mb-1">{physicalAddress}</div>
          <Link to="#!" onClick={scrollToEventMap}>
            Ver Mapa
          </Link>
        </CardBody>
      </Card>
      {isIterableArray(activities) && (
        <Card className="mb-3 mb-lg-0">
          <FalconCardHeader title="Events you may like" />
          <CardBody className="fs--1">
            {isRequesting ? (
              <Loader />
            ) : (
              isIterableArray(activities) &&
              activities.map(({ id, additional, ...rest }, index) => (
                <EventSummary {...rest} divider={activities.length !== index + 1} key={id}>
                  <p className="text-1000 mb-0" dangerouslySetInnerHTML={createMarkup(additional)} />
                </EventSummary>
              ))
            )}
          </CardBody>
          <FalconCardFooterLink title="Todas las actividades" to="/actividades" />
        </Card>
      )}
    </>
  );
};

const ActivityDetail = ({ match, location }) => {
  const {
    params: { id }
  } = match;
  console.log(id);
  const [activity, setActivity] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();

  const activities = useSelector(state => state.activities);

  const isRequesting = useSelector(state => selectRequesting(state, [ActivityAction.REQUEST_ACTIVITY_BY_ID]));
  const exitsErrors = useSelector(state => hasErrors(state, [ActivityAction.REQUEST_ACTIVITY_BY_ID_FINISHED]));
  const errors = useSelector(state => selectRawErrors(state, [ActivityAction.REQUEST_ACTIVITY_BY_ID_FINISHED]));
  const isEmptyObject = !Object.keys(activity).length;

  useEffect(() => {
    if (isIterableArray(activities)) {
      const [activityIndivitual] = activities.filter(a => a.id === Number(id));
      console.log(activityIndivitual);
      setActivity(activityIndivitual);
    } else {
      dispatch(ActivityAction.getActivityById(id));
    }
  }, [activities, id, dispatch]);

  useEffect(() => {
    if (!isRequesting && isEmptyObject && exitsErrors) {
      history.push('/actividades');
      dispatch(ErrorAction.removeById(errors[ActivityAction.REQUEST_ACTIVITY_BY_ID_FINISHED].id));
    }
  }, [isRequesting, exitsErrors, dispatch, history, errors, isEmptyObject]);

  return isRequesting || isEmptyObject ? (
    <Loader />
  ) : (
    <>
      <NavbarStandard location={location} match={match} hasColor />
      <Section>
        <ContentWithAsideLayout
          banner={<ActivityDetailBanner {...activity} />}
          aside={<ActivityDetailAside {...activity} />}
        >
          <ActivityDetailContent description={activity.description} />
        </ContentWithAsideLayout>
      </Section>
    </>
  );
};

export default ActivityDetail;
