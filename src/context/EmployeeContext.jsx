// src/context/CardsContext.js

import React, { createContext, useState, useEffect } from 'react';

export const EmployeeContext = createContext();

export function EmployeeProvider({ children }) {
  // Function to get initial state from sessionStorage or use default
  const getInitialEmployee = () => {
    const employee = sessionStorage.getItem('Employee');
    if (employee) {
      try {
        return JSON.parse(employee);
      } catch (error) {
        console.error('Error parsing employee from sessionStorage:', error);
        // If parsing fails, return default cards
      }
    }

    // Default cards data
    return {
      // 1. Importance Ratings (1 to 5)
      workLifeBalance: 4,
      creativity: 5,
      professionalDevelopment: 3,
      inclusivityAndDiversity: 5,
      mentalHealthSupport: 4,
      impactfulness: 5,
      sustainability: 4,
      recognitionAndAppreciation: 5,
      transparentCommunication: 5,
      socialWorkEnvironment: 4,
    
      // 2. Preference Scales (1 to 5)
      routineVariability: 5,           // 1 = Routine, 5 = Variability
      creativityAnalytical: 2,         // 1 = Creativity, 5 = Analytical
      independenceCollaboration: 3,    // 1 = Independence, 5 = Collaboration
    
      // 3. Preferences with Options
      workLocationPreference: 'remote',      // Options: 'onsite', 'remote'
      employmentTypePreference: 'fullTime',  // Options: 'fullTime', 'partTime', 'both'
    
      // 4. Basic Information
      yearsOfExperience: 5,
      locations: ['New York', 'San Francisco'],
      languages: ['English', 'Spanish'],
      education: "Bachelor's Degree in Computer Science",
    };
    
  };

  const [employee, setEmployee] = useState(getInitialEmployee);

 

  // Save cards to sessionStorage whenever they change
  useEffect(() => {
    sessionStorage.setItem('Employee', JSON.stringify(employee));
  }, [employee]);


  return (
    <EmployeeContext.Provider value={{ employee }}>
      {children}
    </EmployeeContext.Provider>
  );
}
