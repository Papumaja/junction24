import React from 'react';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { CardsContext } from '../context/CardsContext';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Chip,
    Grid,
    Button,
  } from '@mui/material';

export default function JobListingPage() {
  const { cards } = useContext(CardsContext);

  const { id } = useParams();
  const job = cards.find((job) => job.id === parseInt(id));
  

  if (!job) {
    return <Typography variant="h5">Job not found</Typography>;
  }


  return (
      <div style={{  margin: '20px 20px 20px 20px'}}>
      {job.image && (
        <CardMedia
          component="img"
          height="200"
          image={job.image}
          alt={job.name}
        />
      )}
g        <Typography variant="h5" component="div" style={{marginBottom:'10px'}}>
          {job.role}
        </Typography>
        <Grid container spacing={1} style={{marginBottom:'10px'}}>
          {job.tags.map((tag) => (
            <Grid item key={tag}>
              <Chip label={tag} />
            </Grid>
          ))}
        </Grid>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {job.location}
        </Typography>
        <Typography variant="body2" color="textSecondary" style={{ marginTop: '10px' }}>
          Published on: {job.publichDate}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Application Deadline: {job.endDate}
        </Typography>
        <Typography variant="body1" paragraph>
          {job.description}
        </Typography>
        <Typography variant="body2" color="textSecondary" paragraph>
          {job.longDescription}
        </Typography>
      
       
        <Button
          variant="contained"
          color="primary"
          href={job.website}
          target="_blank"
          style={{ marginTop: '15px' }}
        >
          Visit Website
        </Button>
    </div>
  );
}
