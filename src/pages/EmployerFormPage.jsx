// src/pages/FormPage.js

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
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
  const { control, handleSubmit } = useForm({
    defaultValues: {
      jobDescription: '',
      selectedTags: [],
      scalarAnswers: scalars.reduce((acc, scalar) => {
        acc[scalar.name] = 5; // Default value for each scalar
        return acc;
      }, {}),
    },
  });

  const onSubmit = (data) => {
    console.log('Form Data:', data);
    // Handle form submission logic here (e.g., send data to an API)
  };

  return (
    <div>
      <h1>Form Page</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Job Description */}
        <Controller
          name="jobDescription"
          control={control}
          render={({ field }) => (
            <Description value={field.value} onChange={field.onChange} />
          )}
        />

        {/* Tags Section */}
        <div>
          <h2>Select Tags</h2>
          <Controller
            name="selectedTags"
            control={control}
            render={({ field }) => {
              const sortedTags = [...tags].sort((a, b) => {
                const aSelected = field.value.includes(a);
                const bSelected = field.value.includes(b);
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
