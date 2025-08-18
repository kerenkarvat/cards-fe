import React, { useState } from 'react';
import CupcakeBackground from './CupcakeBackground';
import CardForm from './CardForm';
import ResponseMessage from './ResponseMessage';
import GeneratedImage from './GeneratedImage';
import styles from './src/styles/App.module.css';

function App() {
  const [text, setText] = useState('');
  const [response, setResponse] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [cardId, setCardId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResponse('');
    setImageUrl(null);
    setCardId(null);
    try {
      const res = await fetch('http://localhost:3000/images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) throw new Error('API error');
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.startsWith('image/')) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        setImageUrl(url);
        setResponse('');
      } else {
        const data = await res.json();
        setResponse(JSON.stringify(data));
        setImageUrl(null);
        if (data.id) {
          setCardId(data.id);
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.brandBar}>
        <div className={styles.logo}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 256" width="240" height="52" role="img" aria-labelledby="title desc">
            <title id="title">MagicCards logo</title>
            <desc id="desc">Rounded gradient tile with a magic wand and sparkle emoji ✨, plus the MagicCards wordmark.</desc>

            <defs>
              <linearGradient id="gc" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%"  stopColor="#D7A7FF"/>
                <stop offset="50%" stopColor="#A177FF"/>
                <stop offset="100%" stopColor="#6C63FF"/>
              </linearGradient>
            </defs>

            {/* ICON */}
            <g>
              <rect x="32" y="32" width="192" height="192" rx="44" fill="url(#gc)"/>

              {/* wand */}
              <g transform="translate(92,156) rotate(-35)">
                <rect x="0" y="-7" width="108" height="14" rx="7" fill="#3B2D6E"/>
                <rect x="0" y="-7" width="48" height="14" rx="7" fill="#FFFFFF"/>
                <circle cx="108" cy="0" r="9"  fill="#FFFFFF"/>
              </g>

              {/* sparkle emoji */}
              <text x="180" y="90" fontSize="32">✨</text>
              <text x="160" y="65" fontSize="24">✨</text>
              <text x="170" y="125" fontSize="20">✨</text>
            </g>

            {/* WORDMARK */}
            <text x="260" y="180"
                  fontFamily="'Nunito', 'Comfortaa', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
                  fontSize="150" fontWeight="500" letterSpacing=".5" fill="#6f76a7">
              MagicCards
            </text>
          </svg>
        </div>
      </div>
      <CupcakeBackground />
      <div className={styles.card}>
        <h1 className={styles.title}>
          Create your magical card
        </h1>
        <CardForm
          text={text}
          setText={setText}
          loading={loading}
          handleSubmit={handleSubmit}
        />
        <ResponseMessage response={response} error={error} />
        <GeneratedImage imageUrl={imageUrl} />
        {cardId && (
          <a
            href={`/card/${cardId}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.cardLink}
          >
            <span>View your greeting card</span>
            <span>→</span>
          </a>
        )}
      </div>
    </div>
  );
}

export default App;
