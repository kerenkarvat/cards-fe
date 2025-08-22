import React, { useState } from 'react';

function CardForm({ occasion, setOccasion, recipientInfo, setRecipientInfo, mood, setMood, designRequest, setDesignRequest, loading, handleSubmit }) {
  const [step, setStep] = useState(0);
  const inputStyle = {
    width: '100%',
    padding: '1rem 1.2rem',
    borderRadius: 14,
    border: '2px solid #6d5bba',
    fontSize: '1.08rem',
    marginBottom: 8,
    outline: 'none',
    background: '#ede7fa',
    color: '#2d186d',
    boxShadow: '0 2px 8px #6d5bba22',
    transition: 'border 0.2s',
    minHeight: 44,
    boxSizing: 'border-box',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.7rem',
    color: '#2d186d',
    fontSize: '1.08rem',
    textAlign: 'left',
    fontWeight: 700,
    letterSpacing: 0.2,
  };

  const steps = [
    {
      label: "What's the occasion?",
      content: (
        <input
          type="text"
          value={occasion}
          onChange={e => setOccasion(e.target.value)}
          placeholder="Birthday, Anniversary, Wedding, Graduation, etc."
          maxLength={200}
          style={inputStyle}
          required
        />
      ),
    },
    {
      label: "Help me get to know the person who will receive this card.",
      content: (
        <textarea
          value={recipientInfo}
          onChange={e => setRecipientInfo(e.target.value)}
          placeholder="Their name, hobbies, ambitions, dreams, needs. What makes them special?"
          style={{ ...inputStyle, height: '150px', resize: 'none' }}
          maxLength={200}
          required
        />
      ),
    },
    {
      label: "What kind of mood or theme should the card have?",
      content: (
        <input
          type="text"
          value={mood}
          onChange={e => setMood(e.target.value)}
          placeholder="Sincere, sarcastic, sentimental, romantic, fun, etc."
          style={inputStyle}
          maxLength={100}
          required
        />
      ),
    },
    {
      label: "Free text to add requests for card design",
      content: (
        <textarea
          value={designRequest}
          onChange={e => setDesignRequest(e.target.value)}
          style={{ ...inputStyle, height: '80px', resize: 'vertical' }}
          placeholder="Any special requests for the card's design? Colors, style, etc. (optional)"
          maxLength={300}
        />
      ),
    },
  ];

  const isLastStep = step === steps.length - 1;
  const isFirstStep = step === 0;

  function handleNext(e) {
    e.preventDefault();
    if (!isLastStep) setStep(step + 1);
  }
  function handleBack(e) {
    e.preventDefault();
    if (!isFirstStep) setStep(step - 1);
  }

  return (
    <form onSubmit={isLastStep ? handleSubmit : handleNext} style={{ width: '100%', maxWidth: 380, margin: '0 auto' }}>
      <label style={labelStyle}>{steps[step].label}</label>
      <div style={{ width: '100%' }}>{steps[step].content}</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: 18, marginBottom: 6 }}>
        {!isFirstStep && (
          <button
            type="button"
            onClick={handleBack}
            style={{
              padding: '0.7rem 1.5rem',
              borderRadius: 12,
              border: 'none',
              background: '#ede7fa',
              color: '#6d5bba',
              fontWeight: 700,
              fontSize: '1.05rem',
              cursor: 'pointer',
              boxShadow: '0 2px 8px #6d5bba22',
              marginRight: 8,
              minWidth: 100,
              transition: 'background 0.2s',
            }}
          >
            Back
          </button>
        )}
        <div style={{ flex: 1 }} />
        {!isLastStep && (
          <button
            type="submit"
            style={{
              padding: '0.7rem 1.5rem',
              borderRadius: 12,
              border: 'none',
              background: 'linear-gradient(90deg, #6d5bba 0%, #a18cd1 100%)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '1.05rem',
              cursor: 'pointer',
              boxShadow: '0 2px 8px #6d5bba33',
              minWidth: 100,
              transition: 'background 0.2s',
            }}
          >
            Next
          </button>
        )}
        {isLastStep && (
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '0.9rem 1.5rem',
              borderRadius: 16,
              border: 'none',
              background: loading
                ? 'linear-gradient(90deg, #a18cd1 0%, #6d5bba 100%)'
                : 'linear-gradient(90deg, #6d5bba 0%, #a18cd1 100%)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '1.12rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 2px 8px #6d5bba33',
              marginBottom: 8,
              letterSpacing: 1,
              transition: 'background 0.3s, transform 0.1s',
              transform: loading ? 'scale(0.98)' : 'scale(1)',
              minWidth: 130,
            }}
          >
            {loading ? 'Sending...' : '✨ Send Magic!'}
          </button>
        )}
      </div>
      <div style={{ marginTop: 16, textAlign: 'center', color: '#6d5bba', fontWeight: 600, fontSize: '1rem', letterSpacing: 0.5 }}>
        Step {step + 1} of {steps.length}
      </div>
    </form>
  );
}

export default CardForm;
