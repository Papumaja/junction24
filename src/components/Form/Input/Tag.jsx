// src/components/Form/Input/Tag.js
import * as React from "react";
import { Chip } from '@mui/material';

export default function Tag({ tag, selectedTags, onChange }) {
  const isSelected = selectedTags.includes(tag);

  return (
    <Chip
      key={tag}
      label={tag}
      clickable
      color={isSelected ? 'primary' : 'default'}
      onClick={() => onChange(tag)}
      style={{ margin: '4px' }}
    />
  );
}
