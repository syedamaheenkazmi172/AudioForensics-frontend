import React from 'react';

interface SidebarButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

function SidebarButton({ onClick, children }: SidebarButtonProps) {
  return (
    <div 
      onClick={onClick}
      style={{
        padding: '0.7rem',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        fontSize: '1.2rem',
        margin: '1rem 0',
        position: 'relative',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--color-secondary)';
        e.currentTarget.style.borderColor = 'var(--color-text)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
      }}
    >
      {children}
    </div>
  );
}

export default SidebarButton;