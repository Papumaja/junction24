import React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Business, Dashboard, List } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { urls } from '../urls';

export default function EmployerNavigation({ value }) {
  const navigate = useNavigate();
  const handleChange = (event, newValue) => {
    switch (newValue) {
      case 0:
        navigate(urls.employer.dashboard);
        break;
      case 1:
        navigate(urls.employer.info);
        break;
      case 2:
        navigate(urls.employer.listings);
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
      <BottomNavigationAction label="Dashboard" icon={<Dashboard />} />
      <BottomNavigationAction label="Employer" icon={<Business />} />
      <BottomNavigationAction label="Job listings" icon={<List />} />
    </BottomNavigation>
  );
}
