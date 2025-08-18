import React from 'react';
import styles from './src/styles/CardForm.module.css';

function CardForm({ text, setText, loading, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Type something magical..."
        className={styles.input}
        maxLength={500}
        required
      />
      <button
        type="submit"
        disabled={loading}
        className={styles.button}
      >
        <div className={styles.buttonText}>
          {loading ? (
            <>
              <div className={styles.loadingSpinner}></div>
              <span>Creating magic...</span>
            </>
          ) : (
            <>
              <span>✨</span>
              <span>Send Magic!</span>
            </>
          )}
        </div>
      </button>
    </form>
  );
}

export default CardForm;
