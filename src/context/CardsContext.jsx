// src/context/CardsContext.js

import React, { createContext, useState, useEffect } from 'react';

export const CardsContext = createContext();

export function CardsProvider({ children }) {
  // Function to get initial state from sessionStorage or use default
  const getInitialCards = () => {
    const storedCards = sessionStorage.getItem('cards');
    if (storedCards) {
      try {
        return JSON.parse(storedCards);
      } catch (error) {
        console.error('Error parsing cards from sessionStorage:', error);
        // If parsing fails, return default cards
      }
    }

    // Default cards data
    return [
      {
        id: 1,
        name: 'TechCorp',
        description: 'Leading provider of tech solutions.',
        image: 'https://via.placeholder.com/300x400?text=TechCorp',
        swiped: 'none',
        longDescription: 'TechCorp is a leading provider of technology solutions for businesses of all sizes. Our team of experts is dedicated to helping you achieve your goals through innovative technology solutions. Whether you need help with software development, IT consulting, or cybersecurity, we have the expertise to help you succeed. Contact us today to learn more about how we can help your business grow and thrive.',
        publichDate: '2022-01-01',
        location: 'San Francisco, CA',
        website: 'https://techcorp.com',
        tags: ['Technology', 'Software', 'Consulting'],
        endDate : '2022-01-15'
      },
      {
        id: 2,
        name: 'InnovateX',
        description: 'Innovative solutions for modern businesses.',
        image: 'https://via.placeholder.com/300x400?text=InnovateX',
        swiped: 'none',
        longDescription: 'InnovateX is a leading provider of innovative solutions for modern businesses. Our team of experts is dedicated to helping you achieve your goals through cutting-edge technology and creative thinking. Whether you need help with software development, digital marketing, or business consulting, we have the expertise to help you succeed. Contact us today to learn more about how we can help your business grow and thrive.',
        publichDate: '2022-01-15',
        location: 'New York, NY',
        website: 'https://innovatex.com',
        tags: ['Innovation', 'Technology', 'Marketing'],
        endDate: '2022-01-30'

      },
      {
        id: 3,
        name: 'Creatives Inc.',
        description: 'Designing the future, one pixel at a time.',
        image: 'https://via.placeholder.com/300x400?text=Creatives+Inc.',
        swiped: 'none',
        longDescription: 'Creatives Inc. is a design agency that specializes in creating beautiful and engaging digital experiences. Our team of designers and developers work together to create websites, mobile apps, and other digital products that help our clients stand out from the competition. Contact us today to learn more about how we can help you bring your vision to life.',
        publichDate: '2022-02-01',
        location: 'Los Angeles, CA',
        website: 'https://creativesinc.com',
        tags: ['Design', 'Web Development', 'Mobile Apps'],
        endDate: '2022-02-15'
      },
      {
        id: 4,
        name: 'AnalytiCo',
        description: 'Data-driven insights for smarter decisions.',
        image: 'https://via.placeholder.com/300x400?text=AnalytiCo',
        swiped: 'none',
        longDescription: 'AnalytiCo is a data analytics firm that helps businesses make smarter decisions through data-driven insights. Our team of data scientists and analysts work with clients to collect, analyze, and interpret data to uncover valuable insights that drive business growth. Contact us today to learn more about how we can help your business succeed.',
        publichDate: '2022-02-15',
        location: 'Chicago, IL',
        website: 'https://analytico.com',
        tags: ['Data Analytics', 'Business Intelligence', 'Consulting'],
        endDate: '2022-02-28'
      },
      {
        id: 5,
        name: 'MarketMasters',
        description: 'Your partner in marketing success.',
        image: 'https://via.placeholder.com/300x400?text=MarketMasters',
        swiped: 'none',
        longDescription: 'MarketMasters is a marketing agency that specializes in helping businesses reach their full potential through strategic marketing campaigns. Our team of marketing experts works with clients to develop customized marketing strategies that drive results and maximize ROI. Contact us today to learn more about how we can help your business grow.',
        publichDate: '2022-03-01',
        location: 'Miami, FL',
        website: 'https://marketmasters.com',
        tags: ['Marketing', 'Advertising', 'Digital Strategy'],
        endDate: '2022-03-15'
      },
      // Add more cards as needed
    ];
  };

  const getInitialCurrentIndex = () => {
    const storedIndex = sessionStorage.getItem('currentIndex');
    if (storedIndex) {
      return parseInt(storedIndex, 10);
    }
    return 0;
  };

  const [cards, setCards] = useState(getInitialCards);
  const [currentIndex, setCurrentIndex] = useState(getInitialCurrentIndex);

  // Function to handle swiping a card
  const swipeCard = (direction) => {
    setCards((prevCards) => {
      const newCards = [...prevCards];
      newCards[currentIndex].swiped = direction;
      return newCards;
    });
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  // Save cards to sessionStorage whenever they change
  useEffect(() => {
    sessionStorage.setItem('cards', JSON.stringify(cards));
  }, [cards]);

  // Save currentIndex to sessionStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem('currentIndex', currentIndex.toString());
  }, [currentIndex]);

  return (
    <CardsContext.Provider value={{ cards, currentIndex, swipeCard }}>
      {children}
    </CardsContext.Provider>
  );
}
