// src/pages/JobListingPage.js

import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { EmployeeContext } from '../context/EmployeeContext';
import { CardsContext } from '../context/CardsContext';
import EmployeeNavigation from '../components/EmployeeNavigation';
import {
    Container,
    Paper,
    Typography,
    Chip,
    Grid,
    Button,
    CardMedia,
    Box,
    Divider,
    Slider,
    Checkbox,
    FormControlLabel,
    FormGroup,
  } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { LocationOn, CalendarToday, AccessTime } from '@mui/icons-material';
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
import { ReviewContext } from '../context/ReviewContext';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    borderRadius: theme.spacing(2),
  },
  media: {
    height: 300,
    borderRadius: theme.spacing(2),
    overflow: 'hidden',
  },
  section: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  radarChartContainer: {
    width: '100%',
    height: 400,
  },
  chip: {
    margin: theme.spacing(0.2),
    marginTop: theme.spacing(1),
  },
  button: {
    marginTop: theme.spacing(2),
  },
  matchPercentage: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderRadius: theme.spacing(1),
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },
  iconText: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1),
  },
  sliderContainer: {
    marginTop: theme.spacing(2),
  },
}));

export default function JobListingPage() {
  const classes = useStyles();
  const { cards } = useContext(CardsContext);
  const { employee } = useContext(EmployeeContext);
  const { reviews } = useContext(ReviewContext);

  const { id } = useParams();

  const job = cards.find((job) => job.id === parseInt(id));
  console.log(job);

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
    You: employee ? employee[criterion.key] : 0,
    Company: job[criterion.key] || 0,
  }));

  console.log(radarData);
  // Calculate match percentage
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

  const matchPercentage = calculateMatchScore(employee, job);
  const [selectedDataSets, setSelectedDataSets] = useState({
    You: true,
    Company: true,
    Reviews: true,
  });

  const handleDataSetChange = (event) => {
    setSelectedDataSets({
      ...selectedDataSets,
      [event.target.name]: event.target.checked,
    });
  };

  // Filter reviews for the current job
  const jobReviews = reviews.filter((review) => review.jobId === job.id);

  // Function to calculate average ratings
  const calculateAverageRatings = (reviews, criteriaKeys) => {
    const averages = {};
    criteriaKeys.forEach((criterion) => {
      const total = reviews.reduce(
        (sum, review) => sum + review[criterion.key],
        0,
      );
      averages[criterion.key] = reviews.length ? total / reviews.length : 0;
    });
    return averages;
  };

  // Calculate average ratings for the current job
  const averageRatings = calculateAverageRatings(jobReviews, criteria);

  return (
    <Container maxWidth="md">
      <Paper className={classes.root} elevation={3}>
        {/* Company Image */}
        {job.image && (
          <CardMedia
            className={classes.media}
            image={job.image}
            title={job.name}
          />
        )}

        {/* Match Percentage */}
        <Box className={classes.matchPercentage} sx={{ marginBottom: '' }}>
          <Typography variant="h4">
            Match Percentage: {matchPercentage}%
          </Typography>
        </Box>

        {/* Job Title and Company Name */}
        <Typography variant="h4" className={classes.section}>
          {job.role}
        </Typography>
        <Typography variant="h6" color="textSecondary">
          {job.name}
        </Typography>

        {/* Location and Dates */}
        <Box className={classes.iconText}>
          <LocationOn color="action" />
          <Typography variant="body1" color="textSecondary" ml={0.5}>
            {job.location}
          </Typography>
        </Box>
        <Box className={classes.iconText}>
          <CalendarToday color="action" />
          <Typography variant="body1" color="textSecondary" ml={0.5}>
            Published on: {job.publichDate}
          </Typography>
        </Box>
        <Box className={classes.iconText}>
          <AccessTime color="action" />
          <Typography variant="body1" color="textSecondary" ml={0.5}>
            Application Deadline: {job.endDate}
          </Typography>
        </Box>

        {/* Tags */}
        <Grid container spacing={1} className={classes.section}>
          {job.tags.map((tag) => (
            <Grid item key={tag}>
              <Chip label={tag} className={classes.chip} color="primary" />
            </Grid>
          ))}
        </Grid>

        <Divider className={classes.section} sx={{ marginBottom: '10px' }} />

        {/* Job Descriptions */}
        <Typography variant="body1" paragraph className={classes.section}>
          {job.description}
        </Typography>
        <Typography variant="body2" paragraph>
          {job.longDescription}
        </Typography>

        {/* Radar Chart */}
        <Typography variant="h5" className={classes.section}>
          How You Match with the Company
        </Typography>
        <FormGroup row className={classes.section}>
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedDataSets.You}
                onChange={handleDataSetChange}
                name="You"
                color="primary"
              />
            }
            label="You"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedDataSets.Company}
                onChange={handleDataSetChange}
                name="Company"
                color="primary"
              />
            }
            label="Company"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedDataSets.Reviews}
                onChange={handleDataSetChange}
                name="Reviews"
                color="primary"
              />
            }
            label="Employee Reviews"
          />
        </FormGroup>

        <div className={classes.radarChartContainer}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="criterion" />
              <PolarRadiusAxis angle={30} domain={[0, 5]} tickCount={6} />
              <Tooltip />
              <Legend />
              {selectedDataSets.You && (
                <Radar
                  name="You"
                  dataKey="You"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6}
                />
              )}
              {selectedDataSets.Company && (
                <Radar
                  name="Company"
                  dataKey="Company"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                  fillOpacity={0.6}
                />
              )}
              {selectedDataSets.Reviews && (
                <Radar
                  name="Employee Reviews"
                  dataKey="Reviews"
                  stroke="#ffc658"
                  fill="#ffc658"
                  fillOpacity={0.6}
                />
              )}
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <Divider className={classes.section} sx={{ marginBottom: '30px' }} />

        {/* Sliders for Company Ratings and Average Reviews */}
        <Typography
          variant="h5"
          className={classes.section}
          sx={{ marginBottom: '10px' }}
        >
          Company Ratings vs. Employee Reviews
        </Typography>

        <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
          <Box display="flex" alignItems="center" mr={3}>
            <Box
              sx={{
                width: 12,
                height: 12,
                backgroundColor: '#82ca9d', // Color for job/company rating
                borderRadius: '50%',
                marginRight: '4px',
              }}
            />
            <Typography variant="caption" color="textSecondary">
              Job Value
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Box
              sx={{
                width: 12,
                height: 12,
                backgroundColor: '#8884d8', // Color for employee average rating
                borderRadius: '50%',
                marginRight: '4px',
              }}
            />
            <Typography variant="caption" color="textSecondary">
              Review Average
            </Typography>
          </Box>
        </Box>
        <Grid container spacing={2}>
          {criteria.map((criterion) => (
            <Grid
              item
              xs={12}
              sm={6}
              key={criterion.key}
              className={classes.sliderContainer}
            >
              <Typography variant="body1" gutterBottom>
                {criterion.name}
              </Typography>
              <Slider
                value={[
                  job[criterion.key] || 0,
                  averageRatings[criterion.key] || 0,
                ]}
                min={1}
                max={5}
                step={0.1}
                marks={[
                  { value: 1, label: '1' },
                  { value: 2, label: '2' },
                  { value: 3, label: '3' },
                  { value: 4, label: '4' },
                  { value: 5, label: '5' },
                ]}
                valueLabelDisplay="auto"
                disabled
                sx={{
                  '& .MuiSlider-thumb[data-index="0"]': {
                    height: 20,
                    width: 20,
                    backgroundColor: '#82ca9d', // Color for job/company rating
                    border: '2px solid white',
                    boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)',
                  },
                  '& .MuiSlider-thumb[data-index="1"]': {
                    height: 20,
                    width: 20,
                    backgroundColor: '#8884d8', // Color for employee average rating
                    border: '2px solid white',
                    boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)',
                  },
                }}
              />

              <Box display="flex" justifyContent="space-between">
                <Typography variant="caption" color="textSecondary">
                  Company Rating: {job[criterion.key] || 'N/A'}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Employee Avg:{' '}
                  {averageRatings[criterion.key]
                    ? averageRatings[criterion.key].toFixed(1)
                    : 'N/A'}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Visit Website Button */}
        <Button
          variant="contained"
          color="primary"
          href={job.website}
          target="_blank"
          className={classes.button}
          fullWidth
          size="large"
          sx={{ marginBottom: '80px', marginTop: '20px' }}
        >
          Visit Company Website
        </Button>
      </Paper>
      <EmployeeNavigation value={0} />
    </Container>
  );
}
