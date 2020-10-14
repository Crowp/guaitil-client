import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Element, scroller } from 'react-scroll';
import Slider from 'react-slick/lib';
import { Button, Card, CardBody, CardImg, Col, Media, Row } from 'reactstrap';
import NavbarStandard from '../../../../template/components/navbar/NavbarStandard';
import Section from '../../../../template/components/common/Section';
import ContentWithAsideLayout from '../../../../template/layouts/ContentWithAsideLayout';
import ButtonIcon from '../../../../template/components/common/ButtonIcon';
import { isIterableArray } from '../../../../template/helpers/utils';
import '../../../../template/assets/styles-css/header-form/dashboard.css';
import defaultImage from '../../../../template/assets/img/background/default.png';
import Loader from '../../../../template/components/common/Loader';
import { selectRequesting } from '../../../../selectors/requesting/RequestingSelector';
import { hasErrors, selectRawErrors } from '../../../../selectors/error/ErrorSelector';
import ErrorAction from '../../../../stores/error/ErrorAction';
import LocalAction from '../../../../stores/local/LocalAction';
import ProductAction from '../../../../stores/product/ProductAction';
import { useDispatch, useSelector } from 'react-redux';
import ProductList from './ProductList';
import Flex from '../../../../template/components/common/Flex';
import ProductFooter from '../../../../template/components/e-commerce/product/ProductFooter';
import usePagination from '../../../../template/hooks/usePagination';
import { getLocalType } from '../../../../utils/LocalType';

const LocalDetailContent = ({ description, id }) => {
  const dispatch = useDispatch();
  const [productIds, setProductIds] = useState([]);
  const products = useSelector(state => state.products);

  const isRequesting = useSelector(state =>
    selectRequesting(state, [ProductAction.REQUEST_ALL_PRODUCTS_ACCEPTED_BY_LOCAL_ID])
  );
  const { data: paginationData, meta: paginationMeta, handler: paginationHandler } = usePagination(productIds, 4);

  useEffect(() => {
    dispatch(ProductAction.getAllProductAcceptedByLocalId(id));
  }, [dispatch, id]);

  useEffect(() => {
    setProductIds(products.map(product => product.id));
  }, [products, setProductIds]);

  return (
    <Card>
      <CardBody>
        <h5 className="fs-0 mb-3">Descripción</h5>
        <p>{description}</p>
        {isRequesting ? (
          <Loader />
        ) : (
          isIterableArray(products) && (
            <Element name="event-products">
              <div className="container">
                <Card className="mb-3">
                  <CardBody>
                    <Row className="justify-content-between align-items-center">
                      <Col sm="auto" className="mb-2 mb-sm-0" tag={Flex} align="center">
                        <h6 className="mb-0 text-nowrap ml-2 ">Productos</h6>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>

                <Card>
                  <CardBody className="p-0  overflow-hidden">
                    <Row>
                      {products
                        .filter(product => paginationData.includes(product.id))
                        .map((product, index) => (
                          <ProductList
                            product={product}
                            key={product.id}
                            index={index}
                            last={index === products.filter(product => paginationData.includes(product.id)).length - 1}
                          />
                        ))}
                    </Row>
                  </CardBody>
                  <ProductFooter meta={paginationMeta} handler={paginationHandler} />
                </Card>
              </div>
            </Element>
          )
        )}
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

export const LocalDetailBanner = ({ name, multimedia, localType }) => (
  <Card className="mb-3">
    {isIterableArray(multimedia) ? (
      <div className="position-relative rounded-top" style={{ maxHeight: 400 }}>
        {multimedia.length === 1 ? (
          <CardImg
            top
            key="local-image"
            style={{ objectFit: 'cover' }}
            data-src={multimedia[0].url}
            height={400}
            className="lazyload"
            alt={multimedia[0].fileName}
          />
        ) : (
          <Slider {...sliderSettings}>
            {multimedia.map(item => (
              <div className="w-100" key={`image-activity-${item.id}`}>
                <img
                  height={400}
                  style={{ objectFit: 'cover' }}
                  className="lazyload rounded w-100"
                  data-src={item.url}
                  alt={item.fileName}
                />
              </div>
            ))}
          </Slider>
        )}
      </div>
    ) : (
      <CardImg
        top
        data-src={defaultImage}
        height={400}
        data-sizes="auto"
        style={{ objectFit: 'cover' }}
        className="lazyload"
        alt="Card image"
      />
    )}
    <CardBody>
      <Row className="justify-content-between align-items-center">
        <Col>
          <Media>
            <Media body className="fs--1 ml-2">
              <h5 className="fs-0">{name}</h5>
              <p className="mb-0">{getLocalType(localType)}</p>
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

const LocalDetailAside = ({ address: { physicalAddress }, products = [] }) => {
  const scrollToEventMap = e => {
    e.preventDefault();
    scroller.scrollTo('event-products', {
      smooth: true
    });
  };

  return (
    <Card className="mb-3 fs--1">
      <CardBody>
        <h6>Dirección</h6>
        <div className="mb-1">{physicalAddress}</div>
        {isIterableArray(products) && (
          <Link to="#!" onClick={scrollToEventMap}>
            Ver productos
          </Link>
        )}
      </CardBody>
    </Card>
  );
};

const LocalDetail = ({ match, location }) => {
  const {
    params: { id }
  } = match;
  console.log(id);
  const [local, setLocal] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();

  const locals = useSelector(state => state.locals);

  const isRequesting = useSelector(state => selectRequesting(state, [LocalAction.REQUEST_LOCAL_BY_ID]));
  const exitsErrors = useSelector(state => hasErrors(state, [LocalAction.REQUEST_LOCAL_BY_ID_FINISHED]));
  const errors = useSelector(state => selectRawErrors(state, [LocalAction.REQUEST_LOCAL_BY_ID_FINISHED]));
  const isEmptyObject = !Object.keys(local).length;

  useEffect(() => {
    if (isIterableArray(locals)) {
      const [localIndivitual] = locals.filter(l => l.id === Number(id));
      console.log(localIndivitual);
      setLocal(localIndivitual);
    } else {
      dispatch(LocalAction.getLocalById(id));
    }
  }, [locals, id, dispatch]);

  useEffect(() => {
    if (!isRequesting && isEmptyObject && exitsErrors) {
      history.push('/');
      dispatch(ErrorAction.removeById(errors[LocalAction.REQUEST_LOCAL_BY_ID].id));
    }
  }, [isRequesting, exitsErrors, dispatch, history, errors, isEmptyObject]);

  return isRequesting || isEmptyObject ? (
    <Loader />
  ) : (
    <>
      <NavbarStandard location={location} match={match} hasColor />
      <Section>
        <ContentWithAsideLayout banner={<LocalDetailBanner {...local} />} aside={<LocalDetailAside {...local} />}>
          <LocalDetailContent description={local.description} id={local.id} />
        </ContentWithAsideLayout>
      </Section>
    </>
  );
};

export default React.memo(LocalDetail);
