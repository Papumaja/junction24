import React, { useState } from 'react';
import { Chip, Slider, Typography } from '@mui/material';
import { tags } from '../data/tags';
import { scalars } from '../data/employerScalars';
import ValueSlider from '../components/Form/Input/ValueSlider';

const initScalarAnswers = (scalars) =>
  scalars.reduce((acc, scalar) => {
    acc[scalar.name] = 0;
    return acc;
  }, {});

export default function FormPage() {
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
          {scalars.map((scalar) =>
            ValueSlider({
              scalar,
              value: scalarAnswers[scalar.name],
              onChange: handleScalarChange,
            }),
          )}
        </div>
      </form>
    </div>
  );
}
