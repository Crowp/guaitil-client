import React, { useState } from 'react';
import {
  Button,
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  Row,
  Col
} from 'reactstrap';
import bt1 from '../../../assets/img/background/ima2.png';
import bt2 from '../../../assets/img/background/img1.jpg';
import bt3 from '../../../assets/img/background/img3.jpg';
import workshop from '../../../assets/img/background/workshop.jpg';
import '../../../assets/styles-css/styleCarrousel/carousel.css';

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
        <img src={item.src} alt={item.altText} className="carousel-image img-fluid" />
        <h1 className="carousel-title items-position carousel-text">{item.caption} </h1>
        <span className="carousel-span items-position carousel-text">{item.description}</span>
        <Button className="carousel-button items-position" outline color="info">
          Ver más
        </Button>
      </CarouselItem>
    );
  });

  return (
    <Row>
      <Col className="d-flex justify-content-center">
        <div className="w-75 p-3" style={{ marginBottom: '80px' }}>
          <Carousel
            activeIndex={activeIndex}
            next={next}
            previous={previous}
            keyboard={false}
            pause={false}
            ride="carousel"
            interval="2000"
            slide={false}
            className="carousel-fade"
          >
            <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
            {slides}
            <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
            <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
          </Carousel>
        </div>
      </Col>
    </Row>
  );
};

export default CarouselImg;
