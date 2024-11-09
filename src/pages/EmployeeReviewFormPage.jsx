import React, { useState } from 'react';
import { tags } from '../data/tags';
import { scalars } from '../data/employerScalars';
import ValueSlider from '../components/Form/Input/ValueSlider';
import ReviewTag from '../components/Form/Input/ReviewTag';
import Description from '../components/Form/Input/Description';
import EmployeeNavigation from '../components/EmployeeNavigation';

const initScalarAnswers = (scalars) =>
  scalars.reduce((acc, scalar) => {
    acc[scalar.name] = 5;
    return acc;
  }, {});

export default function EmployeeReviewFormPage() {
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
      <div className="content">
        <h1>Form Page</h1>
        <form>
          <Description value={jobDescription} onChange={setJobDescription} />
          <div>
            <h2>Select Tags</h2>
            <ReviewTag selectedTags={selectedTags}></ReviewTag>
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
      <EmployeeNavigation value={3} />
    </div>
  );
}