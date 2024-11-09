import { Slider, Typography, Box } from '@mui/material';

export default function ValueSlider({ scalar, value, onChange }) {
  return (
    <div key={scalar.name} style={{ marginBottom: '16px' }}>
      <Typography gutterBottom>{scalar.name}</Typography>
      <Box>
        <Slider
          value={value}
          onChange={(e, newValue) => onChange(scalar.name, newValue)}
          aria-labelledby={`${scalar.name}-slider`}
          valueLabelDisplay="auto"
          step={1}
          min={5}
          max={1}
        />
      </Box>
    </div>
  );
}
