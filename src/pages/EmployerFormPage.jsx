// src/pages/FormPage.js

import React, { useState } from 'react';
import { tags } from '../data/tags';
import { scalars } from '../data/employerScalars';
import ValueSlider from '../components/Form/Input/ValueSlider';
import Tag from '../components/Form/Input/Tag';
import EmployerNavigation from '../components/EmployerNavigation';
import {
  Container,
  Paper,
  Typography,
  Grid,
  Box,
  Button,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    backgroundColor: '#fff',
    padding: theme.spacing(5),
    borderRadius: theme.spacing(1),
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
  },
  headerText: {
    marginBottom: theme.spacing(2),
    color: theme.palette.primary.main,
  },
  sectionTitle: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
    color: theme.palette.primary.dark,
  },
  saveButton: {
    marginTop: theme.spacing(4),
  },
}));

const initScalarAnswers = (scalars) =>
  scalars.reduce((acc, scalar) => {
    acc[scalar.name] = 5;
    return acc;
  }, {});

export default function FormPage() {
  const classes = useStyles();
  const [selectedTags, setSelectedTags] = useState([]);
  const [scalarAnswers, setScalarAnswers] = useState(
    initScalarAnswers(scalars),
  );

  const handleTagChange = (tag) => {
    const newSelectedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];

    setSelectedTags(newSelectedTags);
  };

  const handleScalarChange = (question, value) => {
    setScalarAnswers((prevAnswers) => ({
      ...prevAnswers,
      [question]: value,
    }));
  };

  const sortedTags = [...tags].sort((a, b) => {
    const aSelected = selectedTags.includes(a);
    const bSelected = selectedTags.includes(b);
    if (aSelected && !bSelected) return -1;
    if (!aSelected && bSelected) return 1;
    return 0;
  });

  return (
    <Container maxWidth="md" style={{ marginTop: '40px' }}>
      <Paper className={classes.formContainer}>
        <Typography variant="h1" className={classes.headerText}>
          Employer Profile
        </Typography>
        <Typography variant="body1">
          Manage general information about your company. These answers should apply to all job listings you create.
        </Typography>
        <form>
          {/* Representing Keywords Section */}
          <Typography variant="h2" className={classes.sectionTitle}>
            Representing Keywords
          </Typography>
          <Grid container spacing={1}>
            {sortedTags.map((tag, idx) => (
              <Grid item key={idx}>
                <Tag
                  tag={tag}
                  selectedTags={selectedTags}
                  onChange={handleTagChange}
                />
              </Grid>
            ))}
          </Grid>
          {/* Preferences Section */}
          <Typography variant="h2" className={classes.sectionTitle}>
            Preferences
          </Typography>
          <Grid container spacing={3}>
            {scalars.map((scalar, idx) => (
              <Grid item xs={12} key={idx}>
                <ValueSlider
                  scalar={scalar}
                  value={scalarAnswers[scalar.name]}
                  onChange={handleScalarChange}
                />
              </Grid>
            ))}
          </Grid>
          {/* Save Button */}
          <Button
            variant="contained"
            color="primary"
            className={classes.saveButton}
          >
            Save
          </Button>
        </form>
      </Paper>
      <EmployerNavigation value={0} />
    </Container>
  );
}
