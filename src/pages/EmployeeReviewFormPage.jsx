// src/pages/EmployeeReviewFormPage.js

import React, { useState } from 'react';
import {
  Slider,
  Typography,
  TextField,
  Button,
  Grid,
  Container,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import EmployeeNavigation from '../components/EmployeeNavigation';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  section: {
    marginTop: theme.spacing(4),
  },
  slider: {
    width: '100%',
  },
  submitButton: {
    marginTop: theme.spacing(4),
  },
}));

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

export default function EmployeeReviewFormPage() {
  const classes = useStyles();
  const [description, setDescription] = useState('');
  const [scalarAnswers, setScalarAnswers] = useState(
    criteria.reduce((acc, criterion) => {
      acc[criterion.key] = 3;
      return acc;
    }, {})
  );

  // Assuming we have access to the company data
  // In practice, replace this with actual data from props or context
  const company = {
    name: 'Funny Company Oy',
    tags: ['Flexible Hours', 'Remote Work', 'Great Culture', 'Health Benefits'],
  };

  // State to store the user's responses to the company's tags
  const [tagResponses, setTagResponses] = useState(
    company.tags.reduce((acc, tag) => {
      acc[tag] = null; // 'agree', 'disagree', or null
      return acc;
    }, {})
  );

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleTagResponseChange = (tag) => (event, newAlignment) => {
    setTagResponses((prevResponses) => ({
      ...prevResponses,
      [tag]: newAlignment,
    }));
  };

  const handleSliderChange = (key) => (event, newValue) => {
    setScalarAnswers((prevAnswers) => ({
      ...prevAnswers,
      [key]: newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      description,
      tagResponses,
      scalarAnswers,
    });
  };

  return (
    <Container maxWidth="md">
      <Paper className={classes.root} elevation={3}>
        <Typography variant="h4" gutterBottom sx={{marginBottom: '30px'}}>
          Review {company.name}
        </Typography>
        <form onSubmit={handleSubmit}>
         
          {/* Endorse or Disagree with Company's Tags */}
          <Typography variant="h6" className={classes.section}>
            Endorse or Disagree with Company's Tags
          </Typography>
          <Grid container spacing={2}>
            {company.tags.map((tag) => (
              <Grid item xs={12} sm={6} key={tag}>
                <Typography variant="body1">{tag}</Typography>
                <ToggleButtonGroup
                  value={tagResponses[tag]}
                  exclusive
                  onChange={handleTagResponseChange(tag)}
                  aria-label={`Response to ${tag}`}
                  size="small"
                >
                  <ToggleButton value="agree" aria-label="agree">
                    Agree
                  </ToggleButton>
                  <ToggleButton value="disagree" aria-label="disagree">
                    Disagree
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>
            ))}
          </Grid>

          {/* Scalar Questions */}
          <Typography variant="h6" className={classes.section}>
            Rate the Following
          </Typography>
          <Grid container spacing={2}>
            {criteria.map((criterion) => (
              <Grid item xs={12} sm={6} key={criterion.key}>
                <Typography gutterBottom>{criterion.name}</Typography>
                <Slider
                  value={scalarAnswers[criterion.key]}
                  onChange={handleSliderChange(criterion.key)}
                  aria-labelledby={`slider-${criterion.key}`}
                  min={1}
                  max={5}
                  step={1}
                  marks={[
                    { value: 1, label: '1' },
                    { value: 2, label: '2' },
                    { value: 3, label: '3' },
                    { value: 4, label: '4' },
                    { value: 5, label: '5' },
                  ]}
                  valueLabelDisplay="auto"
                  className={classes.slider}
                />
              </Grid>
            ))}
          </Grid>

          {/* Submit Button */}
           {/* Submit Button */}
           <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            sx={{ marginBottom: '70px' }}
            
            className={classes.submitButton}
          >
            Submit
          </Button>
        </form>
      </Paper>
      <EmployeeNavigation value={3} />
    </Container>
  );
}
