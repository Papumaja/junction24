import React, { useState } from 'react';
import { Chip, Slider, Typography } from '@mui/material';
import { tags } from '../data/tags';

export default function FormPage() {
  const [selectedTags, setSelectedTags] = useState([]);
  const [scalarAnswers, setScalarAnswers] = useState({
    question1: 0,
    question2: 0,
  });

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
    <div>
      <h1>Form Page</h1>
      <form>
        <div>
          <h2>Select Tags</h2>
          {sortedTags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              clickable
              color={selectedTags.includes(tag) ? 'primary' : 'default'}
              onClick={() => handleTagChange(tag)}
              style={{ margin: '4px' }}
            />
          ))}
        </div>
        <div>
          <h2>Scalar Questions</h2>
          <div>
            <Typography gutterBottom>Question 1</Typography>
            <Slider
              value={scalarAnswers.question1}
              onChange={(e, value) => handleScalarChange('question1', value)}
              aria-labelledby="question1-slider"
              valueLabelDisplay="auto"
              step={1}
              marks
              min={0}
              max={10}
            />
          </div>
          <div>
            <Typography gutterBottom>Question 2</Typography>
            <Slider
              value={scalarAnswers.question2}
              onChange={(e, value) => handleScalarChange('question2', value)}
              aria-labelledby="question2-slider"
              valueLabelDisplay="auto"
              step={1}
              marks
              min={0}
              max={10}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
