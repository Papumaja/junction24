import React, { useContext } from 'react';
import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
  Stack,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { CardsContext } from '../context/CardsContext';
import EmployerNavigation from '../components/EmployerNavigation';

const EmployerJobListingsPageContent = () => {
  const { cards } = useContext(CardsContext);

  return (
    <div className="content">
      <Typography variant="h4" style={{ marginBottom: 32 }}>
        Job Listings
      </Typography>
      <Typography style={{ marginBottom: 32 }}>
        Manage and create open job listings.
      </Typography>
      <Stack direction={'column'} spacing={2}>
        {cards.map((card, idx) => (
          <Card sx={{ width: '100%' }} key={idx}>
            <CardActionArea
              component={Link}
              to={`/employer/listings/${card.id}`}
            >
              <CardContent>
                <Typography variant="h5" component="div">
                  {card.role}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {card.description}
                </Typography>
                <div>
                  {card.tags.map((tag, idx) => (
                    <Typography
                      key={idx}
                      variant="caption"
                      color="text.secondary"
                      style={{ marginRight: '8px' }}
                    >
                      {tag}
                    </Typography>
                  ))}
                </div>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
        <Button variant="contained">Add new</Button>
      </Stack>
    </div>
  );
};

export default function EmployerJobListingsPage() {
  return (
    <div>
      <EmployerJobListingsPageContent />
      <EmployerNavigation value={2} />
    </div>
  );
}
