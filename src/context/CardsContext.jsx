// src/context/CardsContext.js

import React, { createContext, useState } from 'react';

export const CardsContext = createContext();

export function CardsProvider({ children }) {
  // Updated cards data with more details
  const [cards, setCards] = useState([
    {
      id: 1,
      name: 'John Doe',
      description: 'Software Engineer at TechCorp',
      image: 'https://via.placeholder.com/300x400?text=John+Doe',
      swiped: 'none',
    },
    {
      id: 2,
      name: 'Jane Smith',
      description: 'Product Manager at InnovateX',
      image: 'https://via.placeholder.com/300x400?text=Jane+Smith',
      swiped: 'none',
    },
    {
      id: 3,
      name: 'Alice Johnson',
      description: 'UX Designer at Creatives Inc.',
      image: 'https://via.placeholder.com/300x400?text=Alice+Johnson',
      swiped: 'none',
    },
    {
      id: 4,
      name: 'Bob Williams',
      description: 'Data Scientist at AnalytiCo',
      image: 'https://via.placeholder.com/300x400?text=Bob+Williams',
      swiped: 'none',
    },
    {
      id: 5,
      name: 'Carol Brown',
      description: 'Marketing Lead at MarketMasters',
      image: 'https://via.placeholder.com/300x400?text=Carol+Brown',
      swiped: 'none',
    },
    // Add more cards as needed
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

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
