import React, { useState } from 'react';
import { tags } from '../data/tags';
import { scalars } from '../data/employerScalars';
import ValueSlider from '../components/Form/Input/ValueSlider';
import Tag from '../components/Form/Input/Tag';
import EmployerNavigation from '../components/EmployerNavigation';
import { Typography } from '@mui/material';

const EmployerFormPageContent = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const handleTagChange = (tag) => {
    const newSelectedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];

    setSelectedTags(newSelectedTags);
  };

  const sortedTags = [...tags].sort((a, b) => {
    const aSelected = selectedTags.includes(a);
    const bSelected = selectedTags.includes(b);
    if (aSelected && !bSelected) return -1;
    if (!aSelected && bSelected) return 1;
    return 0;
  });

  return (
    <div className="content">
      <Typography variant="h4" style={{ marginBottom: 32 }}>
        Employer
      </Typography>
      <Typography style={{ marginBottom: 32 }}>
        Manage general information about your company and its culture. These
        answers should apply to all job listings you create.
      </Typography>
      <form>
        <div>
          <Typography variant="h5" style={{ marginBottom: 16 }}>
            Representing keywords
          </Typography>
          {sortedTags.map((tag, idx) => (
            <Tag
              tag={tag}
              key={idx}
              selectedTags={selectedTags}
              onChange={handleTagChange}
            />
          ))}
        </div>
      </form>
    </div>
  );
};

export default function EmployerFormPage() {
  return (
    <div>
      <EmployerFormPageContent />
      <EmployerNavigation value={1} />
    </div>
  );
}
