import React, { useState, useEffect } from 'react';
import moment from 'moment';

/**
 * Enhanced local Widget component for App 1
 *
 * Demonstrates:
 * - Modern React functional component with hooks
 * - Shared dependency usage (moment.js)
 * - State management
 * - Effect handling
 * - Accessibility features
 * - Modern styling patterns
 */
export default function Widget() {
  const [loadTime] = useState(() => new Date().toLocaleTimeString());
  const [isVisible, setIsVisible] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [currentTime, setCurrentTime] = useState(() => moment());

  useEffect(() => {
    // Animate in after mount
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Update time every second
    const interval = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleInteraction = () => {
    setClickCount(prev => prev + 1);
  };

  return (
    <div
      style={{
        borderRadius: '8px',
        padding: '24px',
        background: 'rgb(255, 0, 0)',
        color: 'white',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.95)',
        opacity: isVisible ? 1 : 0,
        transition: 'all 0.3s ease-out',
        cursor: 'pointer',
        userSelect: 'none',
      }}
      data-e2e="WIDGET__1"
      onClick={handleInteraction}
      onKeyPress={e => e.key === 'Enter' && handleInteraction()}
      tabIndex={0}
      role="button"
      aria-label="Local widget from App 1"
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '12px',
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: '20px',
            fontWeight: '600',
          }}
        >
          App 1 Widget
        </h2>

        <div
          style={{
            fontSize: '12px',
            opacity: 0.8,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            padding: '4px 8px',
            borderRadius: '4px',
          }}
        >
          Loaded: {loadTime}
        </div>
      </div>

      <p
        style={{
          margin: '0 0 12px 0',
          fontSize: '14px',
          lineHeight: '1.5',
          opacity: 0.9,
        }}
      >
        Moment shouldn't download twice
      </p>

      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          padding: '12px',
          borderRadius: '6px',
          marginBottom: '12px',
        }}
      >
        <div style={{ fontSize: '12px', opacity: 0.8, marginBottom: '4px' }}>
          📅 Live Time (via shared moment.js):
        </div>
        <div style={{ fontSize: '16px', fontWeight: 'bold' }}>
          {currentTime.format('MMMM Do YYYY, h:mm:ss a')}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '12px',
          opacity: 0.8,
        }}
      >
        <span>
          🖱️ Interactions: <strong>{clickCount}</strong>
        </span>

        <span
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            padding: '2px 6px',
            borderRadius: '4px',
          }}
        >
          LOCAL
        </span>
      </div>

      {clickCount > 0 && (
        <div
          style={{
            marginTop: '12px',
            padding: '8px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '4px',
            fontSize: '12px',
            textAlign: 'center',
          }}
        >
          🎉 Thank you for interacting! This demonstrates stateful local components.
        </div>
      )}
    </div>
  );
}
