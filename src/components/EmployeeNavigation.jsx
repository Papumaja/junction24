import React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import {
  Business,
  Favorite,
  Layers,
  List,
  Person,
  RateReview,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { urls } from '../urls';

export default function EmployeeNavigation({ value }) {
  const navigate = useNavigate();
  const handleChange = (event, newValue) => {
    switch (newValue) {
      case 0:
        navigate(urls.employee.swipe);
        break;
      case 1:
        navigate(urls.employee.swipe);
        break;
      case 2:
        navigate(urls.employee.info);
        break;
      case 3:
        navigate(urls.employee.review);
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
      <BottomNavigationAction label="You" icon={<Person />} />
      <BottomNavigationAction label="Review" icon={<RateReview />} />
    </BottomNavigation>
  );
}
