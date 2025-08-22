import React from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarButton from '../ui/SidebarButton';

function Sidebar() {
  const navigate = useNavigate();

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
      <SidebarButton onClick={() => navigate('/explore')}>
        Explore Functionalities
      </SidebarButton>
    </div>
  );
}

export default Sidebar;