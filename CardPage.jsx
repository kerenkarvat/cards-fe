import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function CardPage() {
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchImage() {
      try {
        setLoading(true);
        setError('');
        setImageUrl(null);
        // Fetch the image by ID from your backend
        const res = await fetch(`http://localhost:3000/images/${id}`);
        if (!res.ok) throw new Error('Image not found');
        const blob = await res.blob();
        setImageUrl(URL.createObjectURL(blob));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchImage();
  }, [id]);

  return (
    <div style={{ textAlign: 'center', padding: 40 }}>
      <h1>Your Greeting Card</h1>
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: '#ff5858' }}>{error}</div>}
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Greeting Card"
          style={{
            maxWidth: '100%',
            maxHeight: 400,
            borderRadius: 16,
            boxShadow: '0 2px 8px #6d5bba33',
            border: '2px solid #a18cd1',
            background: '#fff',
            margin: '0 auto',
            display: 'block',
          }}
        />
      )}
    </div>
  );
}

export default CardPage;
