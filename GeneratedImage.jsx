import React from 'react';
import styles from './src/styles/GeneratedImage.module.css';

function GeneratedImage({ imageUrl }) {
  if (!imageUrl) return null;

  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <img
          src={imageUrl}
          alt="Generated magical card"
          className={styles.image}
        />
      </div>
    </div>
  );
}

export default GeneratedImage;
