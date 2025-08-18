import React from 'react';

function CupcakeBackground() {
  // MagicCards style: elegant magical icons with subtle presence
  const decorativeElements = [
    // Cupcake elements
    { emoji: '🧁', x: '10%', y: '20%', size: '1.2rem', opacity: 0.3 },
    { emoji: '✨', x: '85%', y: '75%', size: '1.2rem', opacity: 0.3 },
    { emoji: '🧁', x: '50%', y: '10%', size: '1.5rem', opacity: 0.3 },
    { emoji: '🍰', x: '30%', y: '80%', size: '1.3rem', opacity: 0.3 },
    { emoji: '🍰', x: '70%', y: '20%', size: '1.4rem', opacity: 0.3 },

    // Magic Wands
    { emoji: '🪄', x: '75%', y: '10%', size: '1.3rem', opacity: 0.3 },
    { emoji: '🪄', x: '5%', y: '50%', size: '1.1rem', opacity: 0.3 },

    // Celebration
    { emoji: '🎉', x: '85%', y: '40%', size: '1.1rem', opacity: 0.3 },
    { emoji: '🎊', x: '12%', y: '35%', size: '0.9rem', opacity: 0.3 },
    { emoji: '🎈', x: '20%', y: '70%', size: '1.2rem', opacity: 0.3 },

    // Gifts
    { emoji: '🎁', x: '80%', y: '90%', size: '1.2rem', opacity: 0.3 },
    { emoji: '🎁', x: '8%', y: '15%', size: '1rem', opacity: 0.3 },

    // Sparkles and Stars
    { emoji: '✨', x: '25%', y: '15%', size: '1rem', opacity: 0.3 },
    { emoji: '🌟', x: '75%', y: '25%', size: '0.8rem', opacity: 0.3 },
    { emoji: '💫', x: '80%', y: '60%', size: '1rem', opacity: 0.3 },
    { emoji: '⭐', x: '20%', y: '65%', size: '0.9rem', opacity: 0.3 },
    { emoji: '🎭', x: '90%', y: '40%', size: '0.8rem', opacity: 0.3 },
    { emoji: '🎨', x: '30%', y: '85%', size: '0.9rem', opacity: 0.3 },
    { emoji: '🎪', x: '60%', y: '5%', size: '1.1rem', opacity: 0.3 },
    { emoji: '🎉', x: '45%', y: '90%', size: '0.8rem', opacity: 0.3 },
  ];

  const gridItems = decorativeElements.map((element, i) => (
    <span
      key={i}
      style={{
        position: 'absolute',
        left: element.x,
        top: element.y,
        fontSize: element.size,
        opacity: element.opacity,
        userSelect: 'none',
        filter: 'drop-shadow(0 0 6px rgba(255, 255, 255, 0.1))',
        pointerEvents: 'none',
        transition: 'opacity 0.8s ease-in-out',
        transform: 'translateZ(0)', // Hardware acceleration
      }}
    >
      {element.emoji}
    </span>
  ));

  return (
    <>
      {/* Radial gradient overlay for depth */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Strategically placed decorative elements */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        {gridItems}
      </div>
    </>
  );
}

export default CupcakeBackground;
