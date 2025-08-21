// following code is for the first page shown when we open pur app
import React from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      backgroundColor: 'var(--color-primary)',
      color: 'var(--color-text)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Image */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0.35,
        zIndex: 1,
        background: 'url("/background.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(1px)',
      }} />

      <h1 style={{
        fontFamily: 'var(--font-secondary)',
        position: 'absolute',
        top: '5rem',
        left: '5rem',
        margin: 0,
        fontSize: '3rem',
        zIndex: 2  // Added to keep text above animation
      }}>
        EchoTrace
      </h1>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        minHeight: '100vh',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingLeft: '5%',
        width: '50%',
        position: 'relative',
        zIndex: 2  // Added to keep content above animation
      }}>
        <p style={{
          fontSize: '2.5rem',
          lineHeight: '1.3',
          fontWeight: 'bold',
          margin: 0,
          textAlign: 'justify'
        }}>
          Every voice tells a story. Every edit leaves a trace.
        </p>
        <p style={{
          fontSize: '1.5rem',
          lineHeight: '1.6',
          margin: 0,
          textAlign: 'justify'
        }}>
          Uncover hidden narratives through advanced forensic analysis that detects tampering, identifies speakers, and reveals the emotional undercurrents. Where audio meets intelligence, truth emerges.
        </p>
        <p 
          onClick={() => navigate('/home')}
          style={{
            fontSize: '1.8rem',
            color: 'var(--color-accent)',
            cursor: 'pointer',
            textDecoration: 'underline',
            fontStyle: 'italic',
            fontWeight: 600,
            margin: 0,
            transition: 'color 0.2s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-accent-light)'}
          onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-accent)'}
        >
          Explore Now →
        </p>
      </div>
    </div>
  );
}

export default LandingPage;