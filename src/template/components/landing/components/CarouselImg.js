import React, { useState } from 'react';
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators, Row, Col } from 'reactstrap';
import '../../../assets/styles-css/styleCarrousel/carousel.css';
import Section from '../../common/Section';
import bt1 from '../../../assets/img/background/hospedaje.jpg';
import bt2 from '../../../assets/img/background/actividades.jpg';
import workshop from '../../../assets/img/background/local.jpg';
import Img1 from '../../../assets/img/background/IMG_0563.jpg';
import Img2 from '../../../assets/img/background/Lodging.jpg';

const items = [
  {
    src: workshop,
    altText: 'Slide 1',
    caption: 'Talleres',
    description: 'Conoce nuestros talleres'
  },
  {
    src: bt2,
    altText: 'Slide 2',
    caption: 'Actividades',
    description: 'Ven y descubre nuestras actividades'
  },
  {
    src: Img1,
    altText: 'Cocina',
    caption: 'Cocina',
    description: 'Mira toda nuestras cocinas'
  },
  {
    src: Img2,
    altText: 'Hospedaje',
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
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
        style={{ position: 'relative' }}
      >
        <div className="filter-image ">
          <img src={item.src} alt={item.altText} className="img-fluid rounded-0 rounded-sm" />
        </div>
        <h1 className="carousel-title items-position carousel-text ">{item.caption} </h1>
        <span className="carousel-span items-position carousel-text ">{item.description}</span>
        <a href="#" className="carousel-button items-position carousel-text" color="info">
          Ver más
        </a>
      </CarouselItem>
    );
  });

  return (
    <Section fluid className="p-0">
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
            className="carousel-fade carousel-size"
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
