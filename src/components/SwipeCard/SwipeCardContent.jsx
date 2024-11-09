import React, { useContext } from 'react';
import { Typography, IconButton, Box, Chip, Grid } from '@mui/material';
import { CardsContext } from '../../context/CardsContext';
import { EmployeeContext } from '../../context/EmployeeContext';
import { Favorite, Close, Info } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import './SwipeCardContent.css';

const useStyles = makeStyles((theme) => ({

    matchPercentage: {
      marginTop: theme.spacing(2),
      padding: theme.spacing(2),
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      borderRadius: theme.spacing(1),
      textAlign: 'center',
      marginBottom: theme.spacing(2),
    },
    }));

export function SwipeCardContent() {
  // Consume the CardsContext

  const classes = useStyles();
  const { cards, currentIndex, swipeCard } = useContext(CardsContext);
  const { employee } = useContext(EmployeeContext);
  const currentCard = cards[currentIndex];

    // Define the criteria for match calculation
    const criteria = [
        { name: 'Work-Life Balance', key: 'workLifeBalance' },
        { name: 'Creativity', key: 'creativity' },
        { name: 'Professional Development', key: 'professionalDevelopment' },
        { name: 'Inclusivity and Diversity', key: 'inclusivityAndDiversity' },
        { name: 'Mental Health Support', key: 'mentalHealthSupport' },
        { name: 'Impactfulness', key: 'impactfulness' },
        { name: 'Sustainability', key: 'sustainability' },
        { name: 'Recognition and Appreciation', key: 'recognitionAndAppreciation' },
        { name: 'Transparent Communication', key: 'transparentCommunication' },
        { name: 'Social Work Environment', key: 'socialWorkEnvironment' },
      ];
    

  const calculateMatchScore = (employee, companyData) => {
    let score = 0;
    let total = 0;
    

    criteria.forEach((criterion) => {
      const employeeValue = employee ? employee[criterion.key] : 0;
      const companyValue = companyData[criterion.key] || 0;
      if (employeeValue && companyValue) {
        score += 5 - Math.abs(employeeValue - companyValue);
        total += 5;
      }
    });

    const matchPercentage =
      total > 0 ? ((score / total) * 100).toFixed(0) : 'N/A';
    return matchPercentage;
  };

  const matchPercentage = calculateMatchScore(employee, currentCard);

  // Check if there are any cards left
  if (currentIndex >= cards.length) {
    return null;
  }

  return (
    <div className="swipe-card-content">
      <div className="swipe-card-image">
        {currentCard.image ? (
          <img
            src={currentCard.image}
            style={{ maxHeight: '300px' }}
            alt={currentCard.name}
          />
        ) : (
          <div className="swipe-card-image-placeholder" />
        )}
      </div>
      <div className="swipe-card-details">
        <Box className={classes.matchPercentage} sx={{ marginBottom: '' }}>
          <Typography variant="h6">
            Match Percentage: {matchPercentage}%
          </Typography>
        </Box>
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
