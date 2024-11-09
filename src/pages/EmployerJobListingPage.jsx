import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Tag from '../components/Form/Input/Tag';
import Description from '../components/Form/Input/Description';
import EmployerNavigation from '../components/EmployerNavigation';
import { CardsContext } from '../context/CardsContext';
import ContactChannel from '../components/Form/Input/ContactChannel';

export default function EmployerJobListingPage() {
  const { id } = useParams();
  const { cards } = useContext(CardsContext);
  const [job, setJob] = useState(undefined);

  useEffect(() => {
    const initialJob = cards.find((job) => job.id === parseInt(id));
    setJob(initialJob || emptyJob);
  }, [id, cards]);

  if (!job) {
    return <div />;
  }

  return (
    <div className="app-container">
      <div className="content">
        <h1>{job.name}</h1>
        <p>
          Manage your open job listing. Possible employees will contact you
          through specified channels if they match with the job.
        </p>
        <Description
          value={job.description}
          onChange={(value) => setJob(value)}
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
        <ContactChannel job={job} onChange={setJob} />
      </div>

      <EmployerNavigation value={1} />
    </div>
  );
}
