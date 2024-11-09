import React from 'react';
import { TextField, InputAdornment, Stack, Typography } from '@mui/material';
import { Email, Language } from '@mui/icons-material';

export default function ContactChannel({ job, onChange }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <Typography variant="h5" style={{ marginTop: 32, marginBottom: 16 }}>
        Contact channels
      </Typography>
      <Stack direction="column" spacing={2}>
        <TextField
          label="Website"
          variant="outlined"
          fullWidth
          value={job.website ?? ''}
          onChange={(e) => onChange({ ...job, website: e.target.value })}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Language />
                </InputAdornment>
              ),
            },
          }}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={job.email ?? ''}
          onChange={(e) => onChange({ ...job, email: e.target.value })}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            },
          }}
        />
      </Stack>
    </div>
  );
}
