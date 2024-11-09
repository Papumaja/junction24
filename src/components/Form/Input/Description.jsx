import { TextField, Typography } from '@mui/material';

export default function Description({ value, onChange }) {
  return (
    <div>
      <Typography variant="h5" style={{ marginBottom: 16 }}>
        A brief description about the position
      </Typography>
      <TextField
        multiline
        rows={4}
        variant="outlined"
        fullWidth
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ marginBottom: '32px' }}
      />
    </div>
  );
}
