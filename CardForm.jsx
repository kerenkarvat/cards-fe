import React from 'react';

function CardForm({ occasion, setOccasion, recipientInfo, setRecipientInfo, mood, setMood, loading, handleSubmit }) {
  const inputStyle = {
    width: '100%',
    padding: '1.2rem',
    borderRadius: 16,
    border: '2px solid #6d5bba',
    fontSize: '1.1rem',
    marginBottom: 18,
    outline: 'none',
    background: '#ede7fa',
    color: '#2d186d',
    boxShadow: '0 2px 8px #6d5bba22',
    transition: 'border 0.2s',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    color: '#2d186d',
    fontSize: '0.95rem',
    textAlign: 'left',
    fontWeight: 600
  };

  return (
    <form onSubmit={handleSubmit}>
      <label style={labelStyle}>
        What's the occasion?
      </label>
      <input
        type="text"
        value={occasion}
        onChange={e => setOccasion(e.target.value)}
        placeholder="Birthday, Anniversary, Wedding, Graduation, etc."
        maxLength={200}
        style={{
          ...inputStyle,
        }}
        required
      />

      <label style={labelStyle}>
        Help me get to know the person who will receive this card.
      </label>
      <textarea
        value={recipientInfo}
        onChange={e => setRecipientInfo(e.target.value)}
        placeholder="Their name, hobbies, ambitions, dreams, needs. What makes them special?"
        style={{
          ...inputStyle,
          height: '150px',
          resize: 'none',
        }}
        maxLength={200}
        required
      />

      <label style={labelStyle}>
        What kind of mood should the card have?
      </label>
      <input
        type="text"
        value={mood}
        onChange={e => setMood(e.target.value)}
        placeholder="Sincere, sarcastic, sentimental, romantic, fun, etc."
        style={{
          ...inputStyle,
        }}
        maxLength={100}
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
