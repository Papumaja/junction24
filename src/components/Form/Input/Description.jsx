// src/components/Form/Input/Description.js

import { TextField } from '@mui/material';

export default function Description({ value, onChange }) {
  return (
    <div>
      <h2>A brief description about the position</h2>
      <TextField
        multiline
        rows={4}
        variant="outlined"
        fullWidth
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ marginBottom: '16px' }}
      />
    </div>
  );
}
