// src/context/CardsContext.js

import React, { createContext, useState } from 'react';

export const CardsContext = createContext();

export function CardsProvider({ children }) {
  // Updated cards data with more details
  const [cards, setCards] = useState([
    {
      id: 1,
      name: 'FinTech Solutions',
      description: 'Full-time, Remote, located in Helsinki',
      image: 'https://via.placeholder.com/300x400?text=FinTech+Solutions',
      swiped: 'right',
    },
    {
      id: 2,
      name: 'Nordic Innovators',
      description: 'Part-time, On-site, located in Tampere',
      image: 'https://via.placeholder.com/300x400?text=Nordic+Innovators',
      swiped: 'right',
    },
    {
      id: 3,
      name: 'Polar Digital',
      description: 'Full-time, Remote, located in Oulu',
      image: 'https://via.placeholder.com/300x400?text=Polar+Digital',
      swiped: 'right',
    },
    {
      id: 4,
      name: 'Sisu Analytics',
      description: 'Full-time, On-site, located in Turku',
      image: 'https://via.placeholder.com/300x400?text=Sisu+Analytics',
      swiped: 'right',
    },
    {
      id: 5,
      name: 'MarketVision',
      description: 'Part-time, Remote, located in Espoo',
      image: 'https://via.placeholder.com/300x400?text=MarketVision',
      swiped: 'right',
    },

    // Add more cards as needed
  ]);

  const [currentIndex, setCurrentIndex] = useState(5);

  const swipeCard = (direction) => {
    setCards((prevCards) => {
      const newCards = [...prevCards];
      newCards[currentIndex].swiped = direction;
      return newCards;
    });
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <CardsContext.Provider value={{ cards, currentIndex, swipeCard }}>
      {children}
    </CardsContext.Provider>
  );
}
