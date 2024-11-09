import React from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';

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

export default function JobListingPage() {
  const { id } = useParams();
  const job = jobListings.find((job) => job.id === parseInt(id));

  if (!job) {
    return <Typography variant="h5">Job not found</Typography>;
  }

  return (
    <div class="container">
      <Typography variant="h4">{job.title}</Typography>
      <Typography variant="body1">{job.description}</Typography>
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
    </div>
  );
}
