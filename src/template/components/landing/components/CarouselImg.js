import React, { useState } from 'react';
import LazyLoad from 'react-lazyload';
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators, Row, Col } from 'reactstrap';
import '../../../assets/styles-css/style-carrousel/carousel.css';
import Section from '../../common/Section';
import bt2 from '../../../assets/img/background/actividades.jpg';
import workshop from '../../../assets/img/background/local.jpg';
import Img1 from '../../../assets/img/background/IMG_0563.jpg';
import Img2 from '../../../assets/img/background/Lodging.jpg';

const items = [
  {
    src: workshop,
    altText: 'Imagen de Taller',
    caption: 'Talleres',
    description: 'Conoce nuestros talleres'
  },
  {
    src: bt2,
    altText: 'Imagen de Actividad',
    caption: 'Actividades',
    description: 'Ven y descubre nuestras actividades'
  },
  {
    src: Img1,
    altText: 'Imagen de Cocina',
    caption: 'Cocina',
    description: 'Mira toda nuestras cocinas'
  },
  {
    src: Img2,
    altText: 'Imagen de Hospedaje',
    caption: 'Hospedaje',
    description: 'Mira los diferentes hospedajes que ofrecemos'
  }
];

const CarouselImg = props => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = newIndex => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map(item => {
    return (
      <CarouselItem
        className="carousel-item-size position-relative"
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <div className="filter-image h-100">
          <LazyLoad offset={100} once>
            <img
              src={item.src}
              alt={item.altText}
              loading="lazy"
              className="img-fluid rounded-0 rounded-sm w-100 h-100 "
              style={{ objectFit: 'cover' }}
            />
          </LazyLoad>
        </div>
        <h1 className="carousel-title fs-5 text-white items-position carousel-text-shadow">{item.caption} </h1>
        <span className="carousel-span text-white items-position carousel-text-shadow">{item.description}</span>
        <p className="carousel-button items-position carousel-text-shadows d-inline">Ver más</p>
      </CarouselItem>
    );
  });

  return (
    <Section fluid className="p-0 ">
      <Row className="data-slice1-scale ">
        <Col className="d-flex justify-content-center p-0">
          <Carousel
            activeIndex={activeIndex}
            next={next}
            previous={previous}
            keyboard={false}
            pause={false}
            ride="carousel"
            interval="4500"
            slide={false}
            className="carousel-fade carousel-size "
          >
            <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
            {slides}
            <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
            <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
          </Carousel>
        </Col>
      </Row>
    </Section>
  );
};

export default CarouselImg;
