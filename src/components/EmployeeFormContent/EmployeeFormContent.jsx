import React, { useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
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
  const { control, handleSubmit, setValue } = useForm();
  const { setEmployee, employee } = useContext(EmployeeContext);
  const navigate = useNavigate();

  // Set form fields with initial values from employee context
  React.useEffect(() => {
    if (employee) {
      Object.keys(employee).forEach((key) => {
        setValue(key, employee[key]);
      });
    }
  }, [employee, setValue]);

  const onSubmit = (data) => {

    setEmployee(data); // Update employee context
    navigate('/'); // Redirect after submission
  };

  return (
    <Container maxWidth="md">
      <Paper className={classes.root}>
        <Typography variant="h4" className={classes.header}>
          Your Preferences
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Importance Ratings */}
          <div className={classes.section}>
            <Typography variant="h5">What's Important to You?</Typography>
            <Grid container spacing={2}>
              {[
                { name: 'workLifeBalance', label: 'Work-Life Balance' },
                { name: 'creativity', label: 'Creativity' },
                {
                  name: 'professionalDevelopment',
                  label: 'Professional Development',
                },
                {
                  name: 'inclusivityAndDiversity',
                  label: 'Inclusivity and Diversity',
                },
                { name: 'mentalHealthSupport', label: 'Mental Health Support' },
                { name: 'impactfulness', label: 'Impactfulness' },
                { name: 'sustainability', label: 'Sustainability' },
                {
                  name: 'recognitionAndAppreciation',
                  label: 'Recognition and Appreciation',
                },
                {
                  name: 'transparentCommunication',
                  label: 'Transparent Communication',
                },
                {
                  name: 'socialWorkEnvironment',
                  label: 'Social Work Environment',
                },
              ].map((item) => (
                <Grid item xs={12} key={item.name}>
                  <Controller
                    name={item.name}
                    control={control}
                    defaultValue={employee[item.name] || 3}
                    render={({ field }) => (
                      <Box sx={{ width: '100%' }}>
                        <Typography gutterBottom>{item.label}</Typography>
                        <Slider
                          {...field}
                          value={field.value || employee[item.name] || 3}
                          onChange={(_, value) => field.onChange(value)}
                          step={1}
                          min={1}
                          max={5}
                          valueLabelDisplay="auto"
                        />
                      </Box>
                    )}
                  />
                </Grid>
              ))}
            </Grid>
          </div>

          {/* Work Style Preferences */}
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
              ].map((item) => (
                <Grid item xs={12} key={item.name}>
                  <Controller
                    name={item.name}
                    control={control}
                    defaultValue={employee[item.name] || 3}
                    render={({ field }) => (
                      <Box>
                        <div className={classes.sliderLabel}>
                          <Typography>{item.labels[0]}</Typography>
                          <Typography>{item.labels[1]}</Typography>
                        </div>
                        <Slider
                          {...field}
                          value={field.value || employee[item.name] || 3}
                          onChange={(_, value) => field.onChange(value)}
                          step={1}
                          min={1}
                          max={5}
                          valueLabelDisplay="auto"
                        />
                      </Box>
                    )}
                  />
                </Grid>
              ))}
            </Grid>
          </div>

          {/* Preferences with Options */}
          <div className={classes.section}>
            <Typography variant="h5">Preferences</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormLabel component="legend">
                  Work Location Preference
                </FormLabel>
                <Controller
                  name="workLocationPreference"
                  control={control}
                  defaultValue={employee.workLocationPreference || 'onsite'}
                  render={({ field }) => (
                    <RadioGroup
                      row
                      {...field}
                      sx={{ justifyContent: 'center' }}
                    >
                      <FormControlLabel
                        value="onsite"
                        control={<Radio />}
                        label="On-site"
                      />
                      <FormControlLabel
                        value="remote"
                        control={<Radio />}
                        label="Remote"
                      />
                      <FormControlLabel
                        value="both"
                        control={<Radio />}
                        label="Both OK"
                      />
                    </RadioGroup>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <FormLabel component="legend">
                  Employment Type Preference
                </FormLabel>
                <Controller
                  name="employmentTypePreference"
                  control={control}
                  defaultValue={employee.employmentTypePreference || 'fullTime'}
                  render={({ field }) => (
                    <RadioGroup
                      row
                      {...field}
                      sx={{ justifyContent: 'center' }}
                    >
                      <FormControlLabel
                        value="fullTime"
                        control={<Radio />}
                        label="Full-time"
                      />
                      <FormControlLabel
                        value="partTime"
                        control={<Radio />}
                        label="Part-time"
                      />
                      <FormControlLabel
                        value="both"
                        control={<Radio />}
                        label="Both OK"
                      />
                    </RadioGroup>
                  )}
                />
              </Grid>
            </Grid>
          </div>

          {/* Basic Information */}
          <div className={classes.section}>
            <Typography variant="h5" sx={{ marginBottom: '30px' }}>Tell Us About Yourself</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="yearsOfExperience"
                  control={control}
                  defaultValue={employee.yearsOfExperience || ''}
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
              <Grid item xs={12} sm={6}>
                <Controller
                  name="locations"
                  control={control}
                  defaultValue={
                    employee.locations ? employee.locations.join(', ') : ''
                  }
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
              <Grid item xs={12} sm={6}>
                <Controller
                  name="languages"
                  control={control}
                  defaultValue={
                    employee.languages ? employee.languages.join(', ') : ''
                  }
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
              <Grid item xs={12} sm={6}>
                <Controller
                  name="education"
                  control={control}
                  defaultValue={employee.education || ''}
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
