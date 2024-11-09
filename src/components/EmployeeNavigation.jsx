import React from 'react';
import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
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
    <Box 
      className="navigation"
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
        overflow: 'visible',
      }}
    >
      {/* Logo on the left side */}
      <Box>
        <img src="/logo.png" alt="Logo" style={{ height: '40px' }} />
      </Box>

      {/* Bottom Navigation */}
      <BottomNavigation
        value={value}
        onChange={handleChange}
        showLabels
        sx={{
          width: '100%',
          maxWidth: '600px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <BottomNavigationAction className="BottomNavigationItem" label="Home" icon={<Layers />} />
        <BottomNavigationAction className="BottomNavigationItem" label="Saved" icon={<Favorite />} />
        <BottomNavigationAction className="BottomNavigationItem" label="You" icon={<Person />} />
        <BottomNavigationAction className="BottomNavigationItem" label="Review" icon={<RateReview />} />
      </BottomNavigation>
    </Box>
  );
}
