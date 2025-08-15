import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


const defaultPages = [
  {
    type: 'image',
    content: null, // Will be replaced with the fetched image
  },
  {
    type: 'text',
    content: '',
  },
];

function CardPage() {
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(defaultPages);
  const [textValue, setTextValue] = useState('');

  useEffect(() => {
    async function fetchImage() {
      try {
        setLoading(true);
        setError('');
        setImageUrl(null);
        const res = await fetch(`http://localhost:3000/images/${id}`);
        if (!res.ok) throw new Error('Image not found');
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        setImageUrl(url);
        setPages([
          { type: 'image', content: url },
          ...defaultPages.slice(1),
        ]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchImage();
  }, [id]);

  const handlePrev = () => setPage((p) => Math.max(0, p - 1));
  const handleNext = () => {
    // If on the last page, always add a new blank text page and go to it
    if (page === pages.length - 1) {
      setPages((prev) => [...prev, { type: 'text', content: '' }]);
      setPage((p) => p + 1);
    } else {
      setPage((p) => p + 1);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #a18cd1 0%, #6d5bba 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Quicksand, Comic Sans MS, sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative confetti and sparkles */}
      <div style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
      }}>
        {/* Confetti dots */}
        {[...Array(18)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${8 + Math.random() * 8}px`,
            height: `${8 + Math.random() * 8}px`,
            borderRadius: '50%',
            background: [
              '#fffbe7', '#ffe0f7', '#d1eaff', '#f7e6ff', '#ffe6e6', '#e0ffd1', '#f7f3ff', '#f9e6ff', '#e6f7ff'
            ][i % 9],
            opacity: 0.7,
            filter: 'blur(0.5px)',
          }} />
        ))}
        {/* Sparkles */}
        {[...Array(8)].map((_, i) => (
          <div key={'sparkle'+i} style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${18 + Math.random() * 16}px`,
            opacity: 0.6,
            color: ['#fff', '#ffe0f7', '#f7e6ff', '#fffbe7'][i % 4],
            pointerEvents: 'none',
            userSelect: 'none',
          }}>
            ✨
          </div>
        ))}
      </div>
      <div
        style={{
          background: '#fff',
          borderRadius: 28,
          boxShadow: '0 8px 32px 0 rgba(109, 91, 186, 0.10)',
          padding: '3rem 2.5rem',
          maxWidth: 600,
          width: '100%',
          minHeight: 520,
          textAlign: 'center',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {loading && <div>Loading...</div>}
        {error && <div style={{ color: '#ff5858' }}>{error}</div>}
        {!loading && !error && (
          <>
            {pages[page].type === 'image' && pages[page].content && (
              <img
                src={pages[page].content}
                alt="Greeting Card"
                style={{
                  maxWidth: '90%',
                  maxHeight: 420,
                  borderRadius: 20,
                  boxShadow: '0 2px 12px #a18cd122',
                  background: 'rgba(255,255,255,0.95)',
                  margin: '0 auto',
                  display: 'block',
                  zIndex: 2,
                  position: 'relative',
                }}
              />
            )}
            {pages[page].type === 'text' && (
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  minHeight: 320,
                  margin: '2.5rem 0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  perspective: 800,
                }}
              >
                <div
                  style={{
                    background: '#fff',
                    borderRadius: 18,
                    boxShadow: '0 4px 16px #a18cd122',
                    width: '100%',
                    minHeight: 320,
                    padding: '2.2rem',
                    fontFamily: 'Quicksand, Comic Sans MS, sans-serif',
                    fontWeight: 600,
                    color: '#6d5bba',
                    fontSize: 26,
                    position: 'relative',
                    transition: 'box-shadow 0.2s',
                    overflow: 'hidden',
                  }}
                >
                  <textarea
                    value={pages[page].content}
                    onChange={e => {
                      const val = e.target.value;
                      setPages(pgs => pgs.map((pg, idx) => idx === page ? { ...pg, content: val } : pg));
                    }}
                    placeholder="Write your message here..."
                    style={{
                      width: '100%',
                      minHeight: 220,
                      fontSize: 26,
                      color: '#6d5bba',
                      padding: 0,
                      border: 'none',
                      background: 'transparent',
                      fontFamily: 'Quicksand, Comic Sans MS, sans-serif',
                      fontWeight: 600,
                      resize: 'vertical',
                      outline: 'none',
                    }}
                  />
                  {/* Page curl effect */}
                  <div
                    style={{
                      position: 'absolute',
                      right: 0,
                      bottom: 0,
                      width: 60,
                      height: 60,
                      background: 'radial-gradient(circle at 100% 100%, #e0d6f7 0%, #f7f3ff 80%)',
                      borderTopLeftRadius: 60,
                      boxShadow: '-8px 8px 24px #a18cd122',
                      zIndex: 2,
                    }}
                  />
                </div>
              </div>
            )}
            <div style={{ marginTop: 24, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
              {/* Left Arrow */}
              <button
                onClick={handlePrev}
                disabled={page === 0}
                aria-label="Previous page"
                style={{
                  background: 'none',
                  border: 'none',
                  color: page === 0 ? '#ccc' : '#a18cd1',
                  fontSize: 36,
                  cursor: page === 0 ? 'not-allowed' : 'pointer',
                  padding: 0,
                  marginRight: 8,
                  transition: 'color 0.2s',
                  userSelect: 'none',
                }}
              >
                &#8592;
              </button>
              <span style={{ color: '#6d5bba', fontWeight: 700, fontSize: 18 }}>
                Page {page + 1} / {pages.length}
              </span>
              {/* Right Arrow */}
              <button
                onClick={handleNext}
                aria-label="Next page"
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#a18cd1',
                  fontSize: 36,
                  cursor: 'pointer',
                  padding: 0,
                  marginLeft: 8,
                  transition: 'color 0.2s',
                  userSelect: 'none',
                }}
              >
                &#8594;
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CardPage;
