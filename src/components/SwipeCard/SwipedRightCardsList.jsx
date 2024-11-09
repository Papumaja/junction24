// src/components/SwipeCard/SwipedRightCardsList.js

import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Chip,
  Box,
  Tooltip,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { CardsContext } from '../../context/CardsContext';
import { EmployeeContext } from '../../context/EmployeeContext';
import {
  LocationOn,
  CalendarToday,
  AccessTime,
} from '@mui/icons-material';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(4),
  },
  card: {
    position: 'relative',
    borderRadius: theme.spacing(2),
    boxShadow: theme.shadows[3],
    cursor: 'pointer',
    '&:hover': {
      boxShadow: theme.shadows[6],
    },
  },
  media: {
    height: 200,
  },
  content: {
    paddingBottom: theme.spacing(2),
  },
  chip: {
    margin: theme.spacing(0.5, 0.5, 0.5, 0),
  },
  matchPercentage: {
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(0.5, 1),
    borderRadius: theme.spacing(1),
    fontWeight: 'bold',
  },
  iconText: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1),
  },
}));

export default function SwipedRightCardsList({ cards }) {
  const classes = useStyles();
  const { employee } = useContext(EmployeeContext);
  const navigate = useNavigate();

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

  // Function to calculate match percentage
  const calculateMatchPercentage = (employee, companyData) => {
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

    const matchPercentage = ((score / total) * 100).toFixed(0);
    return matchPercentage;
  };

  // Calculate match percentage for each card and sort them
  const cardsRankedByMatch = cards
    .map((card) => {
      const matchPercentage = calculateMatchPercentage(employee, card);
      return { ...card, matchPercentage };
    })
    .sort((a, b) => b.matchPercentage - a.matchPercentage);

  return (
    <div className={classes.container}>
      <Typography variant="h4" gutterBottom>
        Companies You Liked
      </Typography>
      <Grid container spacing={3}>
        {cardsRankedByMatch.map((card) => (
          <Grid item xs={12} sm={6} md={4} key={card.id}>
            <Card
              className={classes.card}
              onClick={() => navigate(`/employee/listings/${card.id}`)}
            >
              {card.image && (
                <CardMedia
                  className={classes.media}
                  image={card.image}
                  title={card.name}
                />
              )}
              <div className={classes.matchPercentage}>
                <Tooltip title="Match Percentage" arrow>
                {card.matchPercentage}%
                </Tooltip>
              </div>
              <CardContent className={classes.content}>
                <Typography variant="h6">{card.role}</Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {card.name}
                </Typography>
                {/* Location */}
                <Box className={classes.iconText}>
                  <LocationOn fontSize="small" color="action" />
                  <Typography variant="body2" color="textSecondary" ml={0.5}>
                    {card.location}
                  </Typography>
                </Box>
                {/* Publish Date */}
                <Box className={classes.iconText}>
                  <CalendarToday fontSize="small" color="action" />
                  <Typography variant="body2" color="textSecondary" ml={0.5}>
                    Posted: {card.publichDate}
                  </Typography>
                </Box>
                {/* End Date */}
                <Box className={classes.iconText}>
                  <AccessTime fontSize="small" color="action" />
                  <Typography variant="body2" color="textSecondary" ml={0.5}>
                    Ends: {card.endDate}
                  </Typography>
                </Box>
                {/* Description */}
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {card.description}
                </Typography>
                {/* Tags */}
                <div>
                  {card.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      className={classes.chip}
                      color="primary"
                      size="small"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
