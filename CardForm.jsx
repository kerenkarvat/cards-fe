import React from 'react';

function CardForm({ text, setText, loading, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Type something cool..."
        style={{
          width: '100%',
          padding: '0.9rem 1rem',
          borderRadius: 16,
          border: '2px solid #6d5bba',
          fontSize: '1.1rem',
          marginBottom: 18,
          outline: 'none',
          background: '#ede7fa',
          color: '#2d186d',
          boxShadow: '0 2px 8px #6d5bba22',
          transition: 'border 0.2s',
        }}
        required
      />
      <button
        type="submit"
        disabled={loading}
        style={{
          width: '100%',
          padding: '0.9rem 1rem',
          borderRadius: 16,
          border: 'none',
          background: loading
            ? 'linear-gradient(90deg, #a18cd1 0%, #6d5bba 100%)'
            : 'linear-gradient(90deg, #6d5bba 0%, #a18cd1 100%)',
          color: '#fff',
          fontWeight: 700,
          fontSize: '1.1rem',
          cursor: loading ? 'not-allowed' : 'pointer',
          boxShadow: '0 2px 8px #6d5bba33',
          marginBottom: 8,
          letterSpacing: 1,
          transition: 'background 0.3s, transform 0.1s',
          transform: loading ? 'scale(0.98)' : 'scale(1)',
        }}
      >
        {loading ? 'Sending...' : '✨ Send Magic!'}
      </button>
    </form>
  );
}

export default CardForm;
