import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Tag from '../components/Form/Input/Tag';
import Description from '../components/Form/Input/Description';
import EmployerNavigation from '../components/EmployerNavigation';
import { CardsContext } from '../context/CardsContext';
import ContactChannel from '../components/Form/Input/ContactChannel';
import { Typography } from '@mui/material';

const allTags = [
  'Software',
  'Innovation',
  'Technology',
  'Marketing',
  'Design',
  'Web Development',
  'Mobile Apps',
  'Data Analytics',
  'Business Intelligence',
  'Consulting',
  'Advertising',
  'Digital Strategy',
];

const EmployerJobListingPageContent = () => {
  const { id } = useParams();
  const { cards } = useContext(CardsContext);
  const [job, setJob] = useState(undefined);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    const initialJob = cards.find((job) => job.id === parseInt(id));
    setJob(
      {
        ...initialJob,
        website: `https://company.com/careers/${initialJob.role
          .toLowerCase()
          .replace(' ', '-')}`,
        email: 'careers@company.com',
      } || emptyJob,
    );
    setSelectedTags(initialJob?.tags || []);
  }, [id, cards]);

  if (!job) {
    return <div />;
  }

  const sortedTags = [...allTags].sort((a, b) => {
    const aSelected = selectedTags.includes(a);
    const bSelected = selectedTags.includes(b);
    if (aSelected && !bSelected) return -1;
    if (!aSelected && bSelected) return 1;
    return 0;
  });

  const handleTagChange = (tag) => {
    const newSelectedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];

    setSelectedTags(newSelectedTags);
  };

  return (
    <div className="content">
      <Typography variant="h4" style={{ marginBottom: 32 }}>
        {job.role}
      </Typography>
      <Typography style={{ marginBottom: 32 }}>
        Edit this open job listing. Possible employees will contact you through
        specified channels if they match with the job.
      </Typography>
      <Description
        value={job.description}
        onChange={(value) => setJob(value)}
      />
      <Typography variant="h5" style={{ marginBottom: 16 }}>
        Representing keywords
      </Typography>
      <div>
        {sortedTags.map((tag, idx) => (
          <Tag
            tag={tag}
            key={idx}
            selectedTags={selectedTags}
            onChange={handleTagChange}
          />
        ))}
      </div>
      <ContactChannel job={job} onChange={setJob} />
    </div>
  );
};

export default function EmployerJobListingPage() {
  return (
    <div>
      <EmployerJobListingPageContent />
      <EmployerNavigation value={2} />
    </div>
  );
}
