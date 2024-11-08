import { Slider, Typography } from '@mui/material';

export default function ValueSlider({ scalar, value, onChange }) {
  const initScalarMarks = (scalar) => [
    { value: scalar.min, label: scalar.minLabel },
    { value: scalar.max, label: scalar.maxLabel },
  ];

  return (
    <div key={scalar.name}>
      <Typography gutterBottom>{scalar.label}</Typography>
      <Slider
        value={value}
        onChange={(e, value) => onChange(scalar.name, value)}
        aria-labelledby={`${scalar.name}-slider`}
        valueLabelDisplay="off"
        step={1}
        marks={initScalarMarks(scalar)}
        min={scalar.min}
        max={scalar.max}
        track={false}
      />
    </div>
  );
}
