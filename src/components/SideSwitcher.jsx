import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Box } from '@mui/material';
import { urls } from '../urls';

export default function SideSwitcher() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = () => {
    if (location.pathname.includes('employer')) {
      navigate(urls.employee.root);
    } else navigate(urls.employer.root);
  };

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
