import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';

export default function CardBase({ children, link }) {
  return (
    <Card>
      <CardActionArea component={Link} to={link}>
        {children}
      </CardActionArea>
    </Card>
  );
}