import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid2 as Grid,
  CardActionArea,
} from '@mui/material';
import { Link } from 'react-router-dom';

const jobListings = [
  {
    id: 1,
    title: 'Software Engineer',
    description: 'Develop and maintain web applications.',
    tags: ['JavaScript', 'React', 'Node.js'],
  },
  {
    id: 2,
    title: 'Product Manager',
    description: 'Lead product development and strategy.',
    tags: ['Leadership', 'Agile', 'Communication'],
  },
  {
    id: 3,
    title: 'UX Designer',
    description: 'Design user interfaces and experiences.',
    tags: ['Design', 'Figma', 'User Research'],
  },
];

export default function JobListingsPage() {
  return (
    <div className="container">
      <h1>Job Listings</h1>
      <Grid container spacing={3}>
        {jobListings.map((job) => (
          <Grid xs={12} sm={6} md={4} key={job.id}>
            <Card>
              <CardActionArea
                component={Link}
                to={`/employer/listings/${job.id}`}
              >
                <CardContent>
                  <Typography variant="h5" component="div">
                    {job.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {job.description}
                  </Typography>
                  <div>
                    {job.tags.map((tag, idx) => (
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
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
