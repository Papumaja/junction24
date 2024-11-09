import React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import {
  Business,
  Favorite,
  Layers,
  List,
  RateReview,
} from '@mui/icons-material';
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
      <BottomNavigationAction label="Home" icon={<Layers />} />
      <BottomNavigationAction label="Saved" icon={<Favorite />} />
      <BottomNavigationAction label="Review" icon={<RateReview />} />
    </BottomNavigation>
  );
}
