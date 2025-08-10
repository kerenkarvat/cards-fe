import React, { useState } from 'react';
import CupcakeBackground from './CupcakeBackground';
import CardForm from './CardForm';
import ResponseMessage from './ResponseMessage';

function App() {
  const [text, setText] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResponse('');
    try {
      const res = await fetch('https://example.com/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      setResponse(JSON.stringify(data));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #a18cd1 0%, #6d5bba 100%)',
      fontFamily: 'Quicksand, Comic Sans MS, sans-serif',
      transition: 'background 0.5s',
    }}>
      <CupcakeBackground />
      <div style={{
        background: 'rgba(245,245,255,0.96)',
        borderRadius: 24,
        boxShadow: '0 8px 32px 0 rgba(109, 91, 186, 0.18)',
        padding: '2.5rem 2rem',
        maxWidth: 420,
        width: '100%',
        margin: '0 auto',
        textAlign: 'center',
        border: '2px solid #a18cd1',
        zIndex: 1,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <h1 style={{
          fontSize: '2.2rem',
          fontWeight: 800,
          marginBottom: 16,
          color: '#6d5bba',
          letterSpacing: 1,
          textShadow: '0 2px 8px #a18cd155',
        }}>
          Create your magical card
        </h1>
        <CardForm
          text={text}
          setText={setText}
          loading={loading}
          handleSubmit={handleSubmit}
        />
        <ResponseMessage response={response} error={error} />
      </div>
    </div>
  );
}

export default App;
