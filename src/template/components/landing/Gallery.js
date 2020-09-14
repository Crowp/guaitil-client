import React from 'react';
import { Row, Col } from 'reactstrap';
import ImageItem from './components/ImageItem';
import img from '../../assets/img/background/img3.jpg';
import Section from '../common/Section';

const Gallery = () => {
  const items = [
    {
      src: img,
      altText: 'Imagen 1'
    },
    {
      src: img,
      altText: 'Imagen 2'
    },
    {
      src: img,
      altText: 'Imagen 3'
    },
    {
      src: img,
      altText: 'Imagen 4'
    },
    {
      src: img,
      altText: 'Imagen 5'
    },
    {
      src: img,
      altText: 'Imagen 6'
    }
  ];

  const imageItem = items.map(item => {
    return (
      <Col sm={4} xs="3" style={{ marginBottom: '1.7rem' }}>
        <ImageItem src={item.src} altText={item.altText} />
      </Col>
    );
  });

  return (
    <Section>
      <Row>{imageItem}</Row>
    </Section>
  );
};
export default Gallery;
