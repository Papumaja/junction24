// src/pages/FormPage.js

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { tags } from '../data/tags';
import { scalars } from '../data/employerScalars';
import ValueSlider from '../components/Form/Input/ValueSlider';
import Tag from '../components/Form/Input/Tag';
import Description from '../components/Form/Input/Description';

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
                  {sortedTags.map((tag) => (
                    <Tag
                      key={tag}
                      tag={tag}
                      selectedTags={field.value}
                      onChange={(selectedTag) => {
                        const newSelectedTags = field.value.includes(selectedTag)
                          ? field.value.filter((t) => t !== selectedTag)
                          : [...field.value, selectedTag];
                        field.onChange(newSelectedTags);
                      }}
                    />
                  ))}
                </div>
              );
            }}
          />
        </div>

        {/* Scalars Section */}
        <div>
          <h2>Scalar Questions</h2>
          {scalars.map((scalar) => (
            <Controller
              key={scalar.name}
              name={`scalarAnswers.${scalar.name}`}
              control={control}
              render={({ field }) => (
                <ValueSlider
                  scalar={scalar}
                  value={field.value}
                  onChange={(name, value) => field.onChange(value)}
                />
              )}
            />
          ))}
        </div>

        {/* Submit Button */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
