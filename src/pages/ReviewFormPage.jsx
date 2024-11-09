import React, { useState } from 'react';
import { tags } from '../data/tags';
import { scalars } from '../data/employerScalars';
import ValueSlider from '../components/Form/Input/ValueSlider';
import Tag from '../components/Form/Input/Tag';
import ReviewTag from '../components/Form/Input/ReviewTag';
import Description from '../components/Form/Input/Description';

const initScalarAnswers = (scalars) =>
  scalars.reduce((acc, scalar) => {
    acc[scalar.name] = 5;
    return acc;
  }, {});

export default function ReviewFormPage() {
  const [jobDescription, setJobDescription] = useState('');
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
        <Description value={jobDescription} onChange={setJobDescription} />
        <div>
          <h2>Select Tags</h2>
          {sortedTags.map((tag) => (
            <ReviewTag
              tag={tag}
              selectedTags={selectedTags}
              onChange={handleTagChange}
            />
          ))}
        </div>
        <div>
          <h2>Scalar Questions</h2>
          {scalars.map((scalar) => (
            <ValueSlider
              scalar={scalar}
              value={scalarAnswers[scalar.name]}
              onChange={handleScalarChange}
            />
          ))}
        </div>
      </form>
    </div>
  );
}
