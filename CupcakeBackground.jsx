import React from 'react';

function CupcakeBackground() {
  return (
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
        const size = 64 + Math.random() * 48;
        const opacity = 0.5 + Math.random() * 0.3;
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
  );
}

export default CupcakeBackground;
