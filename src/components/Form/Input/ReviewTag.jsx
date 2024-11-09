import Box from "@mui/material/Box";
import Tag from './Tag'

export default function ReviewTag({ tag, selectedTags, onChange }) {
    return (
      <div key={tag} style={{position: 'relative', width: 'auto', height: '50px', display: 'inline-block'}}>
        {/* Tag component (could be a button-like component) */}
        <Tag tag={tag} selectedTags={selectedTags} onChange={onChange} />
        
        {/* Overlay buttons */}
        <div
          style={{
            position: 'absolute',
            bottom: '-2px', // Position from the bottom of the parent (Tag)
            left: '50%',
            transform: 'translateX(-50%)', // Center horizontally
            display: 'flex',
            justifyContent: 'space-between',
            width: '70px', // You can adjust the width as needed
          }}
        >
          {/* Like button */}
          <button
            style={{
              padding: '2px 3px',
              backgroundColor: 'green',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
            onClick={() => console.log('Liked!')}
          >
            👍
          </button>
          
          {/* Dislike button */}
          <button
            style={{
              padding: '2px 3px',
              backgroundColor: 'red',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
            onClick={() => console.log('Disliked!')}
          >
           👎 
          </button>
        </div>
      </div>
    );
  }