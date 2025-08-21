import React from 'react';

function Sidebar() {
  return (
    <div style={{
      width: '250px',
      height: '100vh',
      backgroundColor: 'var(--color-primary)',
      position: 'fixed',
      left: 0,
      top: 0,
      padding: '5rem 1rem 1rem',
      color: 'var(--color-text)',
      zIndex: 2
    }}>
      <h2>Sidebar</h2>
      {/* Add sidebar content here */}
    </div>
  );
}

export default Sidebar;