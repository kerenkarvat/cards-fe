
import React, { useState } from 'react';

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
      {/* Cupcake background layer */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}>
        {Array.from({ length: 18 }).map((_, i) => {
          const top = Math.random() * 90;
          const left = Math.random() * 90;
          const size = 64 + Math.random() * 48; // much larger
          const opacity = 0.5 + Math.random() * 0.3; // more visible
          return (
            <span
              key={i}
              style={{
                position: 'absolute',
                top: `${top}%`,
                left: `${left}%`,
                fontSize: `${size}px`,
                opacity,
                userSelect: 'none',
                filter: 'drop-shadow(0 4px 12px #6d5bba55)',
                transform: `rotate(${Math.random() * 360}deg)`,
                zIndex: 0,
                transition: 'opacity 0.3s',
              }}
            >
              🧁
            </span>
          );
        })}
      </div>
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
          color: '#6d5bba', // purple accent
          letterSpacing: 1,
          textShadow: '0 2px 8px #a18cd155',
        }}>
          Create your magical card
        </h1>
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
        {response && (
          <div style={{
            marginTop: 20,
            color: '#6d5bba',
            background: '#ede7fa',
            borderRadius: 12,
            padding: '1rem',
            fontWeight: 600,
            fontSize: '1.05rem',
            boxShadow: '0 2px 8px #6d5bba22',
            wordBreak: 'break-word',
          }}>
            🎉 Response: {response}
          </div>
        )}
        {error && (
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
            ❌ Error: {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
