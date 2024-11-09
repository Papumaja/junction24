import React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Business, List } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function EmployerNavigation({ value }) {
  const navigate = useNavigate();
  const handleChange = (event, newValue) => {
    switch (newValue) {
      case 0:
        navigate('/employer');
        break;
      case 1:
        navigate('/employer/listings');
        break;
      default:
        break;
    }
  };

  return (
    <BottomNavigation
      className="navigation"
      value={value}
      onChange={handleChange}
      showLabels
    >
      <BottomNavigationAction label="Employer" icon={<Business />} />
      <BottomNavigationAction label="Job listings" icon={<List />} />
    </BottomNavigation>
  );
}
