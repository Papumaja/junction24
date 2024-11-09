// src/pages/JobListingPage.js

import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { EmployeeContext } from '../context/EmployeeContext';
import { CardsContext } from '../context/CardsContext';
import {
  Container,
  Paper,
  Typography,
  Chip,
  Grid,
  Button,
  CardMedia,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    marginTop: theme.spacing(4),
  },
  media: {
    height: 300,
    borderRadius: theme.spacing(1),
  },
  section: {
    marginTop: theme.spacing(4),
  },
  radarChartContainer: {
    width: '100%',
    height: 400,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

export default function JobListingPage() {
  const classes = useStyles();
  const { cards } = useContext(CardsContext);
  const { employeeData } = useContext(EmployeeContext);
  const { id } = useParams();

  const job = cards.find((job) => job.id === parseInt(id));

  if (!job) {
    return (
      <Container maxWidth="md">
        <Typography variant="h5">Job not found</Typography>
      </Container>
    );
  }

  // Define the criteria for the radar chart
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

  // Prepare data for the radar chart
  const radarData = criteria.map((criterion) => ({
    criterion: criterion.name,
    Employee: employeeData ? employeeData[criterion.key] : 0,
    Company: job[criterion.key] || 0,
  }));

  // Calculate match percentage
  const totalCriteria = criteria.length;
  const matchCount = criteria.reduce((count, criterion) => {
    const employeeValue = employeeData ? employeeData[criterion.key] : 0;
    const companyValue = job[criterion.key] || 0;
    return count + (employeeValue === companyValue ? 1 : 0);
  }, 0);

  const matchPercentage = ((matchCount / totalCriteria) * 100).toFixed(0);

  return (
    <Container maxWidth="md">
      <Paper className={classes.root}>
        {/* Company Image */}
        {job.image && (
          <CardMedia
            className={classes.media}
            image={job.image}
            title={job.name}
          />
        )}

        {/* Job Title and Company Name */}
        <Typography variant="h4" className={classes.section}>
          {job.role}
        </Typography>
        <Typography variant="h6">{job.name}</Typography>

        {/* Tags */}
        <Grid container spacing={1} className={classes.section}>
          {job.tags.map((tag) => (
            <Grid item key={tag}>
              <Chip label={tag} className={classes.chip} />
            </Grid>
          ))}
        </Grid>

        <Typography variant="h5" className={classes.section}>
          Match Percentage: {matchPercentage}%
        </Typography>

        {/* Location and Dates */}
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {job.location}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Published on: {job.publichDate}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Application Deadline: {job.endDate}
        </Typography>

        {/* Job Descriptions */}
        <Typography variant="body1" paragraph className={classes.section}>
          {job.description}
        </Typography>
        <Typography variant="body2" paragraph>
          {job.longDescription}
        </Typography>

        {/* Company Statistics */}
        <Typography variant="h5" className={classes.section}>
          Company Values
        </Typography>
        <Grid container spacing={2}>
          {criteria.map((criterion) => (
            <Grid item xs={6} sm={4} key={criterion.key}>
              <Typography variant="body2">
                <strong>{criterion.name}:</strong> {job[criterion.key] || 'N/A'}
              </Typography>
            </Grid>
          ))}
        </Grid>

        {/* Radar Chart */}
        <Typography variant="h5" className={classes.section}>
          Match with Your Values
        </Typography>
        <div className={classes.radarChartContainer}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="criterion" />
              <PolarRadiusAxis angle={30} domain={[0, 5]} />
              <Tooltip />
              <Legend />
              <Radar
                name="You"
                dataKey="Employee"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
              <Radar
                name="Company"
                dataKey="Company"
                stroke="#82ca9d"
                fill="#82ca9d"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Visit Website Button */}
        <Button
          variant="contained"
          color="primary"
          href={job.website}
          target="_blank"
          className={classes.button}
        >
          Visit Website
        </Button>
      </Paper>
    </Container>
  );
}
