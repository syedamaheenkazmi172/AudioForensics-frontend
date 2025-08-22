import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SidebarButton from '../ui/SidebarButton';

interface SidebarProps {
  onClose?: () => void;
}

function Sidebar({ onClose }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleExploreClick = () => {
    if (location.pathname === '/explore') {
      onClose && onClose();
      return;
    }
    navigate('/explore');
  };

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
      <SidebarButton onClick={handleExploreClick}>
        Explore Functionalities
      </SidebarButton>
    </div>
  );
}

export default Sidebar;