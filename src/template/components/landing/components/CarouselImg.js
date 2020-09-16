import React, { useState } from 'react';
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators, Row, Col } from 'reactstrap';
import bt1 from '../../../assets/img/background/ima2.png';
import bt2 from '../../../assets/img/background/img1.jpg';
import workshop from '../../../assets/img/background/workshop.jpg';
import '../../../assets/styles-css/styleCarrousel/carousel.css';
import Section from '../../common/Section';

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
    src: bt1,
    altText: 'Slide 3',
    caption: 'Hospedaje',
    description: 'Mira todos nuestros hospedajes'
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
        <img src={item.src} alt={item.altText} className="img-fluid rounded-0 rounded-sm" />
        <h1 className="carousel-title items-position carousel-text font-weight-extra-light">{item.caption} </h1>
        <span className="carousel-span items-position carousel-text font-weight-extra-light">{item.description}</span>
        <a href="#" className="carousel-button items-position carousel-text" color="info">
          Ver más
        </a>
      </CarouselItem>
    );
  });

  return (
    <Section fluid className="p-0">
      <Row className="data-slice1-scale ">
        <Col className="d-flex justify-content-center carousel-item p-0">
          <Carousel
            activeIndex={activeIndex}
            next={next}
            previous={previous}
            keyboard={false}
            pause={false}
            ride="carousel"
            interval="4500"
            slide={false}
            className="carousel-fade carousel-size carousel-size"
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
