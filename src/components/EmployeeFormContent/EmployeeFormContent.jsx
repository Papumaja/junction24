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
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  FormLabel,
  FormGroup,
  Grid,
} from '@mui/material';

export default function EmployeeFormContent() {
  const { control, handleSubmit } = useForm();
  const { setEmployeeData } = useContext(EmployeeContext);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    setEmployeeData(data);
    console.log('Employee Data:', data);
    // Navigate to another page if needed
    navigate('/'); // Redirect to home or another page
  };

  return (
    <div className="content" style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Employee Information Form
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* 1. Importance Ratings (1 to 5) */}
        <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
          Rate the Importance of the Following (1 to 5)
        </Typography>
        {[
          'workLifeBalance',
          'creativity',
          'professionalDevelopment',
          'inclusivityAndDiversity',
          'mentalHealthSupport',
          'impactfulness',
          'sustainability',
          'recognitionAndAppreciation',
          'transparentCommunication',
          'socialWorkEnvironment',
        ].map((item) => (
          <Controller
            key={item}
            name={item}
            control={control}
            defaultValue={3}
            rules={{ required: true }}
            render={({ field }) => (
              <div style={{ marginBottom: '20px' }}>
                <Typography gutterBottom>
                  {item.replace(/([A-Z])/g, ' $1').trim()}
                </Typography>
                <Slider
                  {...field}
                  value={field.value || 3}
                  onChange={(_, value) => field.onChange(value)}
                  step={1}
                  marks
                  min={1}
                  max={5}
                  valueLabelDisplay="auto"
                />
              </div>
            )}
          />
        ))}

        {/* 2. Preference Scales (1 to 5) */}
        <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
          Preference Scales (1 to 5)
        </Typography>
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
          <Controller
            key={item.name}
            name={item.name}
            control={control}
            defaultValue={3}
            rules={{ required: true }}
            render={({ field }) => (
              <div style={{ marginBottom: '20px' }}>
                <Typography gutterBottom>
                  {item.labels[0]} (1) - {item.labels[1]} (5)
                </Typography>
                <Slider
                  {...field}
                  value={field.value || 3}
                  onChange={(_, value) => field.onChange(value)}
                  step={1}
                  marks={[
                    { value: 1, label: item.labels[0] },
                    { value: 5, label: item.labels[1] },
                  ]}
                  min={1}
                  max={5}
                  valueLabelDisplay="auto"
                />
              </div>
            )}
          />
        ))}

        {/* 3. Preferences with Options */}
        <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
          Preferences
        </Typography>
        {/* Work Location Preference */}
        <FormLabel component="legend">Work Location Preference</FormLabel>
        <Controller
          name="workLocationPreference"
          control={control}
          defaultValue="onsite"
          render={({ field }) => (
            <RadioGroup row {...field}>
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
                value="hybrid"
                control={<Radio />}
                label="both ok"
              />
            </RadioGroup>
          )}
        />

        {/* Employment Type Preference */}
        <FormLabel component="legend" style={{ marginTop: '10px' }}>
          Employment Type Preference
        </FormLabel>
        <Controller
          name="employmentTypePreference"
          control={control}
          defaultValue="fullTime"
          render={({ field }) => (
            <RadioGroup row {...field}>
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

        {/* 4. Basic Information */}
        <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
          Basic Information
        </Typography>
        {/* Years of Experience */}
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
              margin="normal"
            />
          )}
        />

        {/* Locations */}
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
              margin="normal"
              helperText="Separate multiple locations with commas"
            />
          )}
        />

        {/* Languages */}
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
              margin="normal"
              helperText="Separate multiple languages with commas"
            />
          )}
        />

        {/* Education */}
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
              margin="normal"
            />
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: '20px' }}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
