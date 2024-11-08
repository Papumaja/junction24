import { Chip } from '@mui/material';

export default function Tag({ tag, selectedTags, onChange }) {
  return (
    <Chip
      key={tag}
      label={tag}
      clickable
      color={selectedTags.includes(tag) ? 'primary' : 'default'}
      onClick={() => onChange(tag)}
      style={{ margin: '4px' }}
    />
  );
}
