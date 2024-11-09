// src/components/SwipeCard/SwipedRightCardsList.js

import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';

export default function SwipedRightCardsList({ cards }) {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Companies You Liked
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {cards.map((card) => (
          <Grid item xs={12} sm={12} md={4} key={card.id}>
            <Card>
              {card.image && (
                <CardMedia
                  component="img"
                  image={card.image}
                  alt={card.name}
                  style={{ height: '140px', objectFit: 'cover' }}
                />
              )}
              <CardContent>
                <Typography variant="h6">{card.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {card.description}
                </Typography>
                {/* Add more company information here if available */}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
