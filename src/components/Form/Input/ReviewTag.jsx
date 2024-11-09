import React, { useState } from 'react';
import Box from "@mui/material/Box";
import Tag from './Tag';
import { tags } from '../../../data/tags';

// Container component for Agree/Disagree
function Container({ label, onDrop, onDragOver, children }) {
  return (
    <div
      onDrop={onDrop}
      onDragOver={onDragOver}
      style={{
        width: '200px',
        height: '200px',
        border: '2px dashed #ccc',
        borderRadius: '8px',
        margin: '10px',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h3>{label}</h3>
      {children}
    </div>
  );
}

function RTag({ tag, onDragStart, onDragEnd }) {
    return (
      <div
        draggable
        onDragStart={(e) => onDragStart(e, tag)} // Start dragging
        onDragEnd={onDragEnd}                    // End dragging
        style={{
          padding: '10px',
          margin: '5px',
          backgroundColor: 'lightgray',
          borderRadius: '8px',
          cursor: 'move',
        }}
      >
        {tag}
      </div>
    );
  }

export default function ReviewTag({selectedTags}) {
  const [setTags] = tags;
  const [agreeTags, setAgreeTags] = useState([]);
  const [disagreeTags, setDisagreeTags] = useState([]);

  // Handle the drag start event
  const onDragStart = (e, tag) => {
    e.dataTransfer.setData('tag', tag);
  };

  // Handle the drag end event (optional)
  const onDragEnd = () => {
    // You can add any additional logic after drag ends, if needed.
  };

  // Handle drop in the Agree container
  const onAgreeDrop = (e) => {
    e.preventDefault();
    const tag = e.dataTransfer.getData('tag');
    setAgreeTags((prev) => [...prev, tag]);
    setTags((prev) => prev.filter((t) => t !== tag)); // Remove from original list
  };

  // Handle drop in the Disagree container
  const onDisagreeDrop = (e) => {
    e.preventDefault();
    const tag = e.dataTransfer.getData('tag');
    setDisagreeTags((prev) => [...prev, tag]);
    setTags((prev) => prev.filter((t) => t !== tag)); // Remove from original list
  };

  // Allow the drop event by preventing the default behavior
  const onDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
      {/* Agree container */}
      <Container label="Agree" onDrop={onAgreeDrop} onDragOver={onDragOver}>
        {agreeTags.map((tag, index) => (
          <RTag key={index} tag={tag} selectedTags={selectedTags} onDragStart={onDragStart} onDragEnd={onDragEnd} />
        ))}
      </Container>

      {/* Disagree container */}
      <Container label="Disagree" onDrop={onDisagreeDrop} onDragOver={onDragOver}>
        {disagreeTags.map((tag, index) => (
          <RTag key={index} tag={tag} selectedTags={selectedTags} onDragStart={onDragStart} onDragEnd={onDragEnd} />
        ))}
      </Container>

      {/* Available tags to drag */}
      <div style={{ width: '200px', padding: '10px' }}>
        <h3>Available Tags</h3>
        {tags.map((tag, index) => (
          <RTag key={index} tag={tag} selectedTags={selectedTags} onDragStart={onDragStart} onDragEnd={onDragEnd} />
        ))}
      </div>
    </div>
  );
}