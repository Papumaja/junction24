import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Box } from '@mui/material';
import { urls } from '../urls';

export default function SideSwitcher() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);

  const handleClick = () => {
    if (location.pathname.includes('employer')) {
      navigate(urls.employee.root);
    } else {
      navigate(urls.employer.root);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      // Hide button if scrolled down 20px or more
      if (window.scrollY > 20) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!isVisible) return null; // Hide component if not visible

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 16,
        right: 16,
      }}
    >
      <Button
        size="small"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Switch Side
      </Button>
    </Box>
  );
}
