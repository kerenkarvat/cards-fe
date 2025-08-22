import React, { useState } from 'react';
import CardForm from './CardForm';
import ResponseMessage from './ResponseMessage';
import GeneratedImage from './GeneratedImage';
import { startFirebaseUI, observeAuthState } from './firebase';
import './firebaseui-overrides.css';


function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  React.useEffect(() => {
    observeAuthState();
  }, []);
  React.useEffect(() => {
    if (showAuthModal) {
      // Wait for modal to render
      setTimeout(() => {
        startFirebaseUI();
      }, 0);
    }
  }, [showAuthModal]);
  const [text, setText] = useState('');
  const [occasion, setOccasion] = useState('');
  const [recipientInfo, setRecipientInfo] = useState('');
  const [mood, setMood] = useState('');
  const [designRequest, setDesignRequest] = useState('');
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
  const apiUrl = import.meta.env.VITE_API_URL || '';
  const res = await fetch(`${apiUrl}/images`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, occasion, recipientInfo, mood, designRequest }),
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
  <div style={{
      minHeight: '100vh',
      width: '100vw',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)',
      fontFamily: 'Quicksand, Comic Sans MS, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 0,
      margin: 0,
    }}>
    {/* Modal for Firebase Auth - moved outside main to prevent extra white space */}
    {showAuthModal && (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0,0,0,0.35)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
        onClick={() => setShowAuthModal(false)}
      >
        <div
          style={{
            background: '#fff',
            borderRadius: 16,
            boxShadow: '0 8px 32px 0 rgba(109, 91, 186, 0.18)',
            padding: '2rem 1.5rem 1.5rem 1.5rem',
            minWidth: 320,
            maxWidth: 400,
            position: 'relative',
          }}
          onClick={e => e.stopPropagation()}
        >
          <button
            style={{
              position: 'absolute',
              top: 8,
              right: 12,
              background: 'none',
              border: 'none',
              fontSize: 22,
              color: '#6d5bba',
              cursor: 'pointer',
              fontWeight: 700,
            }}
            aria-label="Close"
            onClick={() => setShowAuthModal(false)}
          >
            ×
          </button>
          <div id="firebaseui-auth-container" style={{ width: '100%', marginBottom: 12 }}></div>
          <div id="loader" style={{ color: '#6d5bba', marginBottom: 12 }}>Loading...</div>
        </div>
      </div>
    )}
      <header style={{
        width: '100%',
        padding: '2rem 0 1rem 0',
        background: 'none',
        textAlign: 'center',
        position: 'relative',
      }}>
        <button
          style={{
            position: 'absolute',
            left: 24,
            top: 24,
            padding: '0.5rem 1.2rem',
            background: '#6d5bba',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            fontWeight: 700,
            fontSize: '1rem',
            cursor: 'pointer',
            boxShadow: '0 2px 8px #a18cd133',
            zIndex: 2
          }}
          onClick={() => setShowAuthModal(true)}
        >
          Login
        </button>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 900,
          color: '#6d5bba',
          letterSpacing: 2,
          margin: 0,
          textShadow: '0 2px 12px #a18cd133',
        }}>
          Bebeh Cards
        </h1>
        <p style={{
          color: '#6d5bba',
          fontWeight: 500,
          fontSize: '1.1rem',
          margin: '0.5rem 0 0 0',
          letterSpacing: 1,
        }}>
          Create and share magical greeting cards with ease
        </p>
      </header>
      
        <div
          style={{
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
          }}
        >
          <h1
            style={{
              fontSize: '2.2rem',
              fontWeight: 800,
              marginBottom: 16,
              color: '#6d5bba',
              letterSpacing: 1,
              textShadow: '0 2px 8px #a18cd155',
            }}
          >
            Create your magical card
          </h1>
          <CardForm
            text={text}
            setText={setText}
            occasion={occasion}
            setOccasion={setOccasion}
            recipientInfo={recipientInfo}
            setRecipientInfo={setRecipientInfo}
            mood={mood}
            setMood={setMood}
            designRequest={designRequest}
            setDesignRequest={setDesignRequest}
            loading={loading}
            handleSubmit={handleSubmit}
          />
          <ResponseMessage response={response} error={error} />
          <GeneratedImage imageUrl={imageUrl} />
          {cardId && (
            <div style={{ marginTop: 16 }}>
              <a
                href={`/card/${cardId}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#6d5bba', textDecoration: 'underline' }}
              >
                View your greeting card
              </a>
            </div>
          )}
        </div>
    
    </div>
  );
}

export default App;
