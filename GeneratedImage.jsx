import React from 'react';

function GeneratedImage({ imageUrl }) {
  if (!imageUrl) return null;
  return (
    <div style={{ marginTop: 20 }}>
      <img
        src={imageUrl}
        alt="Generated"
        style={{
          maxWidth: '100%',
          maxHeight: 320,
          borderRadius: 16,
          boxShadow: '0 2px 8px #6d5bba33',
          border: '2px solid #a18cd1',
          background: '#fff',
          margin: '0 auto',
          display: 'block',
        }}
      />
    </div>
  );
}

export default GeneratedImage;
