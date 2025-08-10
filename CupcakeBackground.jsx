import React from 'react';

function CupcakeBackground() {
  // Responsive grid: number of columns/rows adapts to screen size using CSS Grid
  // Cupcake and glitter size adapts with vw/vh units
  const rows = 6;
  const cols = 6;
  const gridItems = [];
  for (let i = 0; i < rows * cols; i++) {
    // Alternate between cupcake and glitter
    const isCupcake = (i + Math.floor(i / cols)) % 2 === 0;
    const emoji = isCupcake ? '🧁' : '✨';
    // Add a little more opacity to glitter
    const opacity = isCupcake ? 0.7 : 0.5 + 0.2 * Math.random();
    // Add a little size variation for glitter
    const fontSize = isCupcake ? 'min(7vw, 7vh)' : `min(${5 + Math.random() * 3}vw, ${5 + Math.random() * 3}vh)`;
    gridItems.push(
      <span
        key={i}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize,
          opacity,
          userSelect: 'none',
          filter: isCupcake ? 'drop-shadow(0 4px 12px #6d5bba33)' : 'drop-shadow(0 0 12px #fff7)',
          pointerEvents: 'none',
          width: '100%',
          height: '100%',
          transition: 'opacity 0.3s',
        }}
      >
        {emoji}
      </span>
    );
  }
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gap: '0',
      }}
    >
      {gridItems}
    </div>
  );
}

export default CupcakeBackground;
