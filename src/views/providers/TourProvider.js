import React, { useState, useEffect } from 'react';
import { TourContext } from '../context';
import TourModel from '../../models/TourModel';

const { Provider } = TourContext;
const TourProvider = ({ children, defaultTour }) => {
  const [tour, setTour] = useState(defaultTour || new TourModel());

  useEffect(() => {
    if (defaultTour) {
      setTour(defaultTour);
    }
  }, [defaultTour]);

  const handleInputChangeTour = ({ value, name }) => setTour({ ...tour, [name]: value });

  const value = { tour, setTour, handleInputChangeTour };

  return <Provider value={value}>{children}</Provider>;
};

export default TourProvider;
