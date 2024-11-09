import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
  Stack,
} from '@mui/material';
import { Link } from 'react-router-dom';
import EmployerNavigation from '../components/EmployerNavigation';

const jobListings = [
  {
    id: 1,
    title: 'Software Engineer',
    description: 'Develop and maintain web applicationas.',
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

const EmployerJobListingsPageContent = () => {
  return (
    <div className="content">
      <h1>Job Listings</h1>
      <Stack direction={'column'} spacing={2}>
        {jobListings.map((job, idx) => (
          <Card sx={{ width: '100%' }} key={idx}>
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
        ))}
      </Stack>
    </div>
  );
};

export default function EmployerJobListingsPage() {
  return (
    <div>
      <EmployerJobListingsPageContent />
      <EmployerNavigation value={1} />
    </div>
  );
}
