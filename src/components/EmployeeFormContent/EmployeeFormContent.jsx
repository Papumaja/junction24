// src/pages/EmployeeFormPage.js

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { EmployeeContext } from '../../context/EmployeeContext';
import {
  Typography,
  Slider,
  TextField,
  Button,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormLabel,
  Container,
  Paper,
  Grid,
  Box,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Work, WorkOutline, Home, BusinessCenter } from '@mui/icons-material';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    backgroundColor: '#FFFFFF',
    borderRadius: theme.spacing(2),
    boxShadow: theme.shadows[3],
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  header: {
    marginBottom: theme.spacing(3),
  },
  section: {
    marginTop: theme.spacing(4),
  },
  sliderLabel: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  submitButton: {
    marginTop: theme.spacing(4),
  },
}));

export default function EmployeeFormContent() {
  const classes = useStyles();
  const { control, handleSubmit } = useForm();
  const { setEmployeeData } = useContext(EmployeeContext);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    setEmployeeData(data);
    console.log('Employee Data:', data);
    navigate('/'); // Redirect to home or another page
  };

  return (
    <Container maxWidth="md">
      <Paper className={classes.root}>
        <Typography variant="h4" className={classes.header}>
          Personalize Your Experience
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* 1. Importance Ratings */}
          <div className={classes.section}>
            <Typography variant="h5">What's Important to You?</Typography>
            <Grid container spacing={2}>
              {[
                'Work-Life Balance',
                'Creativity',
                'Professional Development',
                'Inclusivity and Diversity',
                'Mental Health Support',
                'Impactfulness',
                'Sustainability',
                'Recognition and Appreciation',
                'Transparent Communication',
                'Social Work Environment',
              ].map((label, index) => (
                <Grid item xs={12} key={index}>
                  <Controller
                    name={label.replace(/\s+/g, '').toLowerCase()}
                    control={control}
                    defaultValue={3}
                    render={({ field }) => (
                      <Box>
                        <Typography gutterBottom>{label}</Typography>
                        <Slider
                          {...field}
                          value={field.value || 3}
                          onChange={(_, value) => field.onChange(value)}
                          step={1}
                          marks={[
                            { value: 1, label: 'Not Important' },
                            { value: 5, label: 'Very Important' },
                          ]}
                          min={1}
                          max={5}
                          valueLabelDisplay="auto"
                          sx={{
                            color: 'primary.main',
                          }}
                        />
                      </Box>
                    )}
                  />
                </Grid>
              ))}
            </Grid>
          </div>

          {/* 2. Preference Scales */}
          <div className={classes.section}>
            <Typography variant="h5">Your Work Style</Typography>
            <Grid container spacing={2}>
              {[
                {
                  name: 'routineVariability',
                  labels: ['Routine', 'Variability'],
                },
                {
                  name: 'creativityAnalytical',
                  labels: ['Creativity', 'Analytical'],
                },
                {
                  name: 'independenceCollaboration',
                  labels: ['Independence', 'Collaboration'],
                },
              ].map((item, index) => (
                <Grid item xs={12} key={index}>
                  <Controller
                    name={item.name}
                    control={control}
                    defaultValue={3}
                    render={({ field }) => (
                      <Box>
                        <div className={classes.sliderLabel}>
                          <Typography>{item.labels[0]}</Typography>
                          <Typography>{item.labels[1]}</Typography>
                        </div>
                        <Slider
                          {...field}
                          value={field.value || 3}
                          onChange={(_, value) => field.onChange(value)}
                          step={1}
                          marks={[
                            { value: 1, label: '' },
                            { value: 5, label: '' },
                          ]}
                          min={1}
                          max={5}
                          valueLabelDisplay="auto"
                          sx={{
                            color: 'secondary.main',
                          }}
                        />
                      </Box>
                    )}
                  />
                </Grid>
              ))}
            </Grid>
          </div>

          {/* 3. Preferences with Options */}
          <div className={classes.section}>
            <Typography variant="h5">Preferences</Typography>
            <Grid container spacing={2}>
              {/* Work Location Preference */}
              <Grid item xs={12}>
                <FormLabel component="legend">Work Location Preference</FormLabel>
                <Controller
                  name="workLocationPreference"
                  control={control}
                  defaultValue="onsite"
                  render={({ field }) => (
                    <RadioGroup row {...field}>
                      <FormControlLabel
                        value="onsite"
                        control={<Radio color="primary" />}
                        label="On-site"
                      />
                      <FormControlLabel
                        value="remote"
                        control={<Radio color="primary" />}
                        label="Remote"
                      />
                      <FormControlLabel
                        value="hybrid"
                        control={<Radio color="primary" />}
                        label="Both OK"
                      />
                    </RadioGroup>
                  )}
                />
              </Grid>

              {/* Employment Type Preference */}
              <Grid item xs={12}>
                <FormLabel component="legend">Employment Type Preference</FormLabel>
                <Controller
                  name="employmentTypePreference"
                  control={control}
                  defaultValue="fullTime"
                  render={({ field }) => (
                    <RadioGroup row {...field}>
                      <FormControlLabel
                        value="fullTime"
                        control={<Radio color="primary" />}
                        label="Full-time"
                      />
                      <FormControlLabel
                        value="partTime"
                        control={<Radio color="primary" />}
                        label="Part-time"
                      />
                      <FormControlLabel
                        value="both"
                        control={<Radio color="primary" />}
                        label="Both OK"
                      />
                    </RadioGroup>
                  )}
                />
              </Grid>
            </Grid>
          </div>

          {/* 4. Basic Information */}
          <div className={classes.section}>
            <Typography variant="h5">Tell Us About Yourself</Typography>
            <Grid container spacing={2}>
              {/* Years of Experience */}
              <Grid item xs={12} sm={6}>
                <Controller
                  name="yearsOfExperience"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Years of Experience"
                      variant="outlined"
                      type="number"
                      fullWidth
                    />
                  )}
                />
              </Grid>

              {/* Locations */}
              <Grid item xs={12} sm={6}>
                <Controller
                  name="locations"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Preferred Locations"
                      variant="outlined"
                      fullWidth
                      helperText="Separate with commas"
                    />
                  )}
                />
              </Grid>

              {/* Languages */}
              <Grid item xs={12} sm={6}>
                <Controller
                  name="languages"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Languages"
                      variant="outlined"
                      fullWidth
                      helperText="Separate with commas"
                    />
                  )}
                />
              </Grid>

              {/* Education */}
              <Grid item xs={12} sm={6}>
                <Controller
                  name="education"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Education"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
              </Grid>
            </Grid>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            className={classes.submitButton}
          >
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
