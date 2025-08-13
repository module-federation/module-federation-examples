import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';

/**
 * Enhanced remote Widget component for App 2
 * 
 * This component is exposed via Module Federation and consumed by other applications.
 * 
 * Demonstrates:
 * - Remote component with modern React patterns
 * - Shared dependency usage (moment.js)
 * - State management and effects in federated components
 * - Performance optimizations
 * - Accessibility features
 * - Error resilience
 */
export default function Widget() {
  const [loadTime] = useState(() => new Date().toLocaleTimeString());
  const [isVisible, setIsVisible] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [currentTime, setCurrentTime] = useState(() => moment());
  const [isRunning, setIsRunning] = useState(true);
  const intervalRef = useRef();

  useEffect(() => {
    // Animate in after mount
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Update time every second when running
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setCurrentTime(moment());
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const handleInteraction = () => {
    setClickCount(prev => prev + 1);
  };

  const toggleTimer = () => {
    setIsRunning(prev => !prev);
  };

  const formatTimeZone = () => {
    return moment().format('Z');
  };

  return (
    <div
      style={{
        borderRadius: '8px',
        padding: '24px',
        background: 'rgb(0, 0, 255)',
        color: 'white',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.95)',
        opacity: isVisible ? 1 : 0,
        transition: 'all 0.4s ease-out',
        cursor: 'pointer',
        userSelect: 'none',
        position: 'relative',
        overflow: 'hidden'
      }}
      data-e2e="WIDGET__2"
      onClick={handleInteraction}
      onKeyPress={(e) => e.key === 'Enter' && handleInteraction()}
      tabIndex={0}
      role="button"
      aria-label="Remote widget from App 2"
    >
      {/* Animated background effect */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `radial-gradient(circle at ${clickCount * 10}% ${clickCount * 15}%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
        pointerEvents: 'none',
        transition: 'all 0.5s ease'
      }} />
      
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '12px'
        }}>
          <h2 style={{
            margin: 0,
            fontSize: '20px',
            fontWeight: '600'
          }}>
            App 2 Widget
          </h2>
          
          <div style={{
            fontSize: '12px',
            opacity: 0.8,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            padding: '4px 8px',
            borderRadius: '4px'
          }}>
            Loaded: {loadTime}
          </div>
        </div>
        
        <p style={{
          margin: '0 0 12px 0',
          fontSize: '14px',
          lineHeight: '1.5',
          opacity: 0.9
        }}>
          Moment shouldn't download twice
        </p>
        
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          padding: '12px',
          borderRadius: '6px',
          marginBottom: '12px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '8px'
          }}>
            <div style={{ fontSize: '12px', opacity: 0.8 }}>
              📅 Live Time (via shared moment.js):
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleTimer();
              }}
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                border: 'none',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '10px',
                cursor: 'pointer'
              }}
              aria-label={isRunning ? 'Pause timer' : 'Start timer'}
            >
              {isRunning ? '⏸️ Pause' : '▶️ Start'}
            </button>
          </div>
          
          <div style={{
            fontSize: '16px',
            fontWeight: 'bold',
            fontFamily: 'monospace'
          }}>
            {currentTime.format('MMMM Do YYYY, h:mm:ss a')}
          </div>
          
          <div style={{
            fontSize: '12px',
            opacity: 0.7,
            marginTop: '4px'
          }}>
            Timezone: {formatTimeZone()}
          </div>
        </div>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '12px',
          opacity: 0.8
        }}>
          <span>
            🖱️ Interactions: <strong>{clickCount}</strong>
          </span>
          
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              padding: '2px 6px',
              borderRadius: '4px',
              fontSize: '10px'
            }}>
              {isRunning ? '🟢 LIVE' : '🔴 PAUSED'}
            </span>
            
            <span style={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              padding: '2px 6px',
              borderRadius: '4px'
            }}>
              REMOTE
            </span>
          </div>
        </div>
        
        {clickCount > 0 && (
          <div style={{
            marginTop: '12px',
            padding: '8px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '4px',
            fontSize: '12px',
            textAlign: 'center'
          }}>
            🎉 Remote component interaction successful! 
            This proves the federated module is working correctly.
          </div>
        )}
      </div>
    </div>
  );
}
