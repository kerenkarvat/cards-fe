import React from 'react';
import styles from './src/styles/ResponseMessage.module.css';

function ResponseMessage({ response, error }) {
  if (response) {
    return (
      <div className={styles.container}>
        <div className={`${styles.message} ${styles.success}`}>
          🎉 Success: {response}
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className={styles.container}>
        <div className={`${styles.message} ${styles.error}`}>
          ❌ Error: {error}
        </div>
      </div>
    );
  }
  return null;
}

export default ResponseMessage;
