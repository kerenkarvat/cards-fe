import React from 'react';

function ResponseMessage({ response, error }) {
  if (response) {
    return null;
  }
  if (error) {
    return (
      <div style={{
        marginTop: 20,
        color: '#ff5858',
        background: '#ede7fa',
        borderRadius: 12,
        padding: '1rem',
        fontWeight: 600,
        fontSize: '1.05rem',
        boxShadow: '0 2px 8px #ff585822',
        wordBreak: 'break-word',
      }}>
  ❌ {error}
      </div>
    );
  }
  return null;
}

export default ResponseMessage;
