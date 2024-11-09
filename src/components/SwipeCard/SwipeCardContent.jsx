import React, { useContext } from 'react';
import { Typography, IconButton, Box, Chip, Grid } from '@mui/material';
import { CardsContext } from '../../context/CardsContext';
import { Favorite, Close, Info } from '@mui/icons-material';
import './SwipeCardContent.css';

export function SwipeCardContent() {
  // Consume the CardsContext
  const { cards, currentIndex, swipeCard } = useContext(CardsContext);
  const currentCard = cards[currentIndex];

  // Check if there are any cards left
  if (currentIndex >= cards.length) {
    return null;
  }

  return (
    <div className="swipe-card-content">
      <div className="swipe-card-image" style={{maxHeight:"300px"}}>
        {currentCard.image ? (
          <img src={currentCard.image} alt={currentCard.name} />
        ) : (
          <div className="swipe-card-image-placeholder" />
        )}
      </div>
      <div className="swipe-card-details">
  
        <Typography variant="h4" color="textSecondary">
          {currentCard.role}
        </Typography>
        <Typography variant="body2" color="textSecondary" paragraph>
          {currentCard.description}
        </Typography>

        {/* Job Type and Location */}
        <Box
          display="flex"
          gap={2}
          mt={1}
          mb={1}
          sx={{ justifyContent: 'center' }}
        >
          <Typography variant="body2" color="textSecondary">
            <strong>Location:</strong> {currentCard.location || 'N/A'}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <strong>Type:</strong> {currentCard.workLocationPreference || 'N/A'}
          </Typography>
        </Box>

        {/* Tags */}
        <Grid container spacing={1} sx={{ justifyContent: 'center' }}>
          {currentCard.tags?.map((tag, index) => (
            <Grid item key={index}>
              <Chip label={tag} color="primary" size="small" />
            </Grid>
          ))}
        </Grid>
      </div>

      {/* Card Controls */}
      <Box className="swipe-card-controls">
        <IconButton
          aria-label="Dislike"
          className="dislike-button"
          onClick={() => swipeCard('left')}
        >
          <Close fontSize="large" />
        </IconButton>
        <IconButton
          aria-label="Details"
          className="details-button"
          onClick={() => {
            // Navigate to the details page
            window.location.href = `/employee/listings/${currentCard.id}`;
          }}
        >
          <Info fontSize="large" />
        </IconButton>
        <IconButton
          aria-label="Like"
          className="like-button"
          onClick={() => swipeCard('right')}
        >
          <Favorite fontSize="large" />
        </IconButton>
      </Box>
    </div>
  );
}
