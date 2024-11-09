import React, { useState } from 'react';
import { tags } from '../data/tags';
import { scalars } from '../data/employerScalars';
import ValueSlider from '../components/Form/Input/ValueSlider';
import Tag from '../components/Form/Input/Tag';
import EmployerNavigation from '../components/EmployerNavigation';

const initScalarAnswers = (scalars) =>
  scalars.reduce((acc, scalar) => {
    acc[scalar.name] = 5;
    return acc;
  }, {});

export default function FormPage() {
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
        <h1>Employer</h1>
        <p>
          Manage general information about your company. These answers should
          apply to all job listings you create.
        </p>
        <form>
          <div>
            <h2>Representing keywords</h2>
            {sortedTags.map((tag, idx) => (
              <Tag
                tag={tag}
                key={idx}
                selectedTags={selectedTags}
                onChange={handleTagChange}
              />
            ))}
          </div>
          <div>
            <h2>Either or</h2>
            {scalars.map((scalar, idx) => (
              <ValueSlider
                scalar={scalar}
                key={idx}
                value={scalarAnswers[scalar.name]}
                onChange={handleScalarChange}
              />
            ))}
          </div>
        </form>
      </div>
      <EmployerNavigation value={0} />
    </div>
  );
}