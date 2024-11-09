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
        role: 'Software Engineer',
        description: 'Leading provider of tech solutions.',
        image:
          'https://media.istockphoto.com/id/1349030917/photo/business-and-finance-looking-up-at-high-rise-office-buildings-in-the-financial-district-of-a.jpg?s=612x612&w=0&k=20&c=NSnN0va-f1OBG_GA7bTVmUIoBwNDKUXtHD8_PzeTNiA=',
        swiped: 'none',
        longDescription:
          'TechCorp is a leading provider of technology solutions for businesses of all sizes. Our team of experts is dedicated to helping you achieve your goals through innovative technology solutions. Whether you need help with software development, IT consulting, or cybersecurity, we have the expertise to help you succeed. Contact us today to learn more about how we can help your business grow and thrive.',
        publichDate: '2022-01-01',
        location: 'San Francisco, CA',
        website: 'https://techcorp.com',
        tags: ['Technology', 'Software', 'Consulting'],
        endDate: '2022-01-15',

        // Added criteria with random values
        workLifeBalance: 4,
        creativity: 5,
        professionalDevelopment: 3,
        inclusivityAndDiversity: 4,
        mentalHealthSupport: 2,
        impactfulness: 5,
        sustainability: 3,
        recognitionAndAppreciation: 4,
        transparentCommunication: 5,
        socialWorkEnvironment: 3,
        routineVariability: 4,
        creativityAnalytical: 2,
        independenceCollaboration: 5,
        workLocationPreference: 'onsite', // Options: 'onsite', 'remote', 'hybrid'
        employmentTypePreference: 'fullTime', // Options: 'fullTime', 'partTime', 'both'
      },
      {
        id: 2,
        name: 'InnovateX',
        role: 'Product Manager',
        description: 'Innovative solutions for modern businesses.',
        image: 'https://images.pexels.com/photos/41005/rocket-launch-rocket-take-off-soyuz-41005.jpeg',
        swiped: 'none',
        longDescription:
          'InnovateX is a leading provider of innovative solutions for modern businesses. Our team of experts is dedicated to helping you achieve your goals through cutting-edge technology and creative thinking. Whether you need help with software development, digital marketing, or business consulting, we have the expertise to help you succeed. Contact us today to learn more about how we can help your business grow and thrive.',
        publichDate: '2022-01-15',
        location: 'New York, NY',
        website: 'https://innovatex.com',
        tags: ['Innovation', 'Technology', 'Marketing'],
        endDate: '2022-01-30',

        // Added criteria with random values
        workLifeBalance: 3,
        creativity: 5,
        professionalDevelopment: 4,
        inclusivityAndDiversity: 5,
        mentalHealthSupport: 4,
        impactfulness: 5,
        sustainability: 2,
        recognitionAndAppreciation: 3,
        transparentCommunication: 4,
        socialWorkEnvironment: 5,
        routineVariability: 5,
        creativityAnalytical: 3,
        independenceCollaboration: 4,
        workLocationPreference: 'hybrid',
        employmentTypePreference: 'both',
      },
      {
        id: 3,
        name: 'Creatives Inc.',
        role: 'UX Designer',
        description: 'Designing the future, one pixel at a time.',
        image: 'https://images.pexels.com/photos/17525263/pexels-photo-17525263/free-photo-of-peach-juice-in-glasses.jpeg',
        swiped: 'none',
        longDescription:
          'Creatives Inc. is a design agency that specializes in creating beautiful and engaging digital experiences. Our team of designers and developers work together to create websites, mobile apps, and other digital products that help our clients stand out from the competition. Contact us today to learn more about how we can help you bring your vision to life.',
        publichDate: '2022-02-01',
        location: 'Los Angeles, CA',
        website: 'https://creativesinc.com',
        tags: ['Design', 'Web Development', 'Mobile Apps'],
        endDate: '2022-02-15',

        // Added criteria with random values
        workLifeBalance: 5,
        creativity: 5,
        professionalDevelopment: 4,
        inclusivityAndDiversity: 3,
        mentalHealthSupport: 5,
        impactfulness: 4,
        sustainability: 5,
        recognitionAndAppreciation: 5,
        transparentCommunication: 4,
        socialWorkEnvironment: 5,
        routineVariability: 2,
        creativityAnalytical: 1,
        independenceCollaboration: 4,
        workLocationPreference: 'remote',
        employmentTypePreference: 'fullTime',
      },
      {
        id: 4,
        name: 'AnalytiCo',
        role: 'Data Analyst',
        description: 'Data-driven insights for smarter decisions.',
        image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg',
        swiped: 'none',
        longDescription:
          'AnalytiCo is a data analytics firm that helps businesses make smarter decisions through data-driven insights. Our team of data scientists and analysts work with clients to collect, analyze, and interpret data to uncover valuable insights that drive business growth. Contact us today to learn more about how we can help your business succeed.',
        publichDate: '2022-02-15',
        location: 'Chicago, IL',
        website: 'https://analytico.com',
        tags: ['Data Analytics', 'Business Intelligence', 'Consulting'],
        endDate: '2022-02-28',

        // Added criteria with random values
        workLifeBalance: 3,
        creativity: 2,
        professionalDevelopment: 5,
        inclusivityAndDiversity: 4,
        mentalHealthSupport: 3,
        impactfulness: 5,
        sustainability: 4,
        recognitionAndAppreciation: 3,
        transparentCommunication: 5,
        socialWorkEnvironment: 2,
        routineVariability: 3,
        creativityAnalytical: 5,
        independenceCollaboration: 2,
        workLocationPreference: 'onsite',
        employmentTypePreference: 'fullTime',
      },
      {
        id: 5,
        name: 'MarketMasters',
        role: 'Marketing Specialist',
        description: 'Your partner in marketing success.',
        image: 'https://images.pexels.com/photos/709567/pexels-photo-709567.jpeg',
        swiped: 'none',
        longDescription:
          'MarketMasters is a marketing agency that specializes in helping businesses reach their full potential through strategic marketing campaigns. Our team of marketing experts works with clients to develop customized marketing strategies that drive results and maximize ROI. Contact us today to learn more about how we can help your business grow.',
        publichDate: '2022-03-01',
        location: 'Miami, FL',
        website: 'https://marketmasters.com',
        tags: ['Marketing', 'Advertising', 'Digital Strategy'],
        endDate: '2022-03-15',

        // Added criteria with random values
        workLifeBalance: 4,
        creativity: 5,
        professionalDevelopment: 3,
        inclusivityAndDiversity: 5,
        mentalHealthSupport: 4,
        impactfulness: 3,
        sustainability: 5,
        recognitionAndAppreciation: 5,
        transparentCommunication: 3,
        socialWorkEnvironment: 5,
        routineVariability: 2,
        creativityAnalytical: 2,
        independenceCollaboration: 5,
        workLocationPreference: 'hybrid',
        employmentTypePreference: 'both',
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
