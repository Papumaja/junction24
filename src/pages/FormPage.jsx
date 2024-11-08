import React, { useState } from 'react';
import { Chip, Slider, Typography } from '@mui/material';

export default function FormPage() {
  const [selectedTags, setSelectedTags] = useState([]);
  const [scalarAnswers, setScalarAnswers] = useState({
    question1: 0,
    question2: 0,
  });

  const tags = ['Tag1', 'Tag2', 'Tag3', 'Tag4'];

  const handleTagChange = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  const handleScalarChange = (question, value) => {
    setScalarAnswers((prevAnswers) => ({
      ...prevAnswers,
      [question]: value,
    }));
  };

  return (
    <div>
      <h1>Form Page</h1>
      <form>
        <div>
          <h2>Select Tags</h2>
          {tags.map((tag) => (
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
