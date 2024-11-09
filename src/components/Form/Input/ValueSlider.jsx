import { Slider, Typography, Box } from '@mui/material';

export default function ValueSlider({ scalar, value, onChange }) {
  return (
    <div key={scalar.name} style={{ marginBottom: '16px' }}>
      <Typography gutterBottom>{scalar.label}</Typography>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography>{scalar.minLabel}</Typography>
        <Typography>{scalar.maxLabel}</Typography>
      </div>
      <Box>
        <Slider
          value={value}
          onChange={(e, newValue) => onChange(scalar.name, newValue)}
          aria-labelledby={`${scalar.name}-slider`}
          valueLabelDisplay="auto"
          step={1}
          min={scalar.min}
          max={scalar.max}
          track={false}
        />
      </Box>
    </div>
  );
}
