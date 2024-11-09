import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Tag from '../components/Form/Input/Tag';
import Description from '../components/Form/Input/Description';
import EmployerNavigation from '../components/EmployerNavigation';

const jobListings = [
  {
    id: 1,
    title: 'Software Engineer',
    description: 'Develop and maintain web applications.',
    tags: ['JavaScript', 'React', 'Node.js'],
  },
  {
    id: 2,
    title: 'Product Manager',
    description: 'Lead product development and strategy.',
    tags: ['Leadership', 'Agile', 'Communication'],
  },
  {
    id: 3,
    title: 'UX Designer',
    description: 'Design user interfaces and experiences.',
    tags: ['Design', 'Figma', 'User Research'],
  },
];

const emptyJob = {
  title: '',
  description: '',
  tags: [],
};

export default function EmployerJobListingPage() {
  const { id } = useParams();
  const [job, setJob] = useState(emptyJob);

  useEffect(() => {
    const initialJob = jobListings.find((job) => job.id === parseInt(id));
    setJob(initialJob);
    console.log('ASd');
  }, [id]);

  return (
    <div>
      <div className="content">
        <h1>{job.title}</h1>
        <p>
          Manage your open job listing. Possible employees will contact you
          through specified channels if they match with the job.
        </p>
        <Description
          value={job.description}
          onChange={(value) => setJob({ ...job, description: value })}
        />
        <h2>Representing keywords</h2>
        <div>
          {job.tags.map((tag, idx) => (
            <Tag
              tag={tag}
              key={idx}
              selectedTags={job.tags}
              onChange={() => {}}
            />
          ))}
        </div>
      </div>
      <EmployerNavigation value={1} />
    </div>
  );
}
