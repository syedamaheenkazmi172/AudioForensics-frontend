import React from 'react';

interface HeaderProps {
  onToggleSidebar: () => void;
}

function Header({ onToggleSidebar }: HeaderProps) {
  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      padding: '1.5rem 3rem',
      height: '50px',
      backgroundColor: 'var(--color-primary)',
      color: 'var(--color-text)',
      zIndex: 3,
      display: 'flex',
      alignItems: 'center',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <button
        onClick={onToggleSidebar}
        style={{
          backgroundColor: 'transparent',
          border: 'none',
          color: 'var(--color-text)',
          cursor: 'pointer',
          fontSize: '1.5rem',
          padding: '0.5rem',
          marginRight: '2rem',
          marginLeft: '-1rem'  // Added negative margin to shift left
        }}
      >
        ☰
      </button>
      
      <h2 style={{ 
        margin: 0,
        fontSize: '1.8rem',
        position: 'absolute',
        left: '13%',
        transform: 'translateX(-50%)'
      }}>
        EchoTrace
      </h2>
    </header>
  );
}

export default Header;