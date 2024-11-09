import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Tag from '../components/Form/Input/Tag';
import Description from '../components/Form/Input/Description';
import EmployerNavigation from '../components/EmployerNavigation';
import { CardsContext } from '../context/CardsContext';
import ContactChannel from '../components/Form/Input/ContactChannel';
import { Typography, Slider } from '@mui/material';

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

const sliders = [
  { name: 'Work-Life Balance', value: 4 },
  { name: 'Creativity', value: 2 },
  { name: 'Professional Development', value: 3 },
  { name: 'Inclusivity and Diversity', value: 5 },
  { name: 'Mental Health Support', value: 4 },
  { name: 'Impactfulness', value: 4 },
  { name: 'Sustainability', value: 3 },
  { name: 'Recognition and Appreciation', value: 5 },
  { name: 'Transparent Communication', value: 4 },
  { name: 'Social Work Environment', value: 2 },
];

const initScalarAnswers = (scalars) =>
  scalars.reduce((acc, scalar) => {
    acc[scalar.name] = scalar.value;
    return acc;
  }, {});

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
      <Typography variant="h5" style={{ marginTop: 32, marginBottom: 16 }}>
        Evaluate job criterias
      </Typography>
      {sliders.map((slider, idx) => (
        <div style={{ marginBottom: 16 }} key={idx}>
          <Typography> {slider.name}</Typography>
          <Slider
            defaultValue={slider.value}
            min={1}
            max={5}
            step={0.5}
            marks={[
              { value: 1, label: '1' },
              { value: 2, label: '2' },
              { value: 3, label: '3' },
              { value: 4, label: '4' },
              { value: 5, label: '5' },
            ]}
            valueLabelDisplay="auto"
            sx={{
              '& .MuiSlider-thumb[data-index="0"]': {
                height: 20,
                width: 20,
                backgroundColor: '#82ca9d', // Color for job/company rating
                border: '2px solid white',
                boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)',
              },
              '& .MuiSlider-thumb[data-index="1"]': {
                height: 20,
                width: 20,
                backgroundColor: '#8884d8', // Color for employee average rating
                border: '2px solid white',
                boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)',
              },
            }}
          />
        </div>
      ))}
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
