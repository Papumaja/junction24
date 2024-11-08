// src/components/Form/Input/ValueSlider.js

import { Slider, Typography } from '@mui/material';

export default function ValueSlider({ scalar, value, onChange }) {
  const initScalarMarks = () => [
    { value: scalar.min, label: scalar.minLabel },
    { value: scalar.max, label: scalar.maxLabel },
  ];

  return (
    <div key={scalar.name} style={{ marginBottom: '16px' }}>
      <Typography gutterBottom>{scalar.label}</Typography>
      <Slider
        value={value}
        onChange={(e, newValue) => onChange(scalar.name, newValue)}
        aria-labelledby={`${scalar.name}-slider`}
        valueLabelDisplay="auto"
        step={1}
        marks={initScalarMarks()}
        min={scalar.min}
        max={scalar.max}
        track={false}
      />
    </div>
  );
}
