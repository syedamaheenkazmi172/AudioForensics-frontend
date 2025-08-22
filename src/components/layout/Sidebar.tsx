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

  const handleAddCaseClick = () => {
    if (location.pathname === '/add-case') {
      onClose && onClose();
      return;
    }
    navigate('/add-case');
  };

  const handleReviewCaseClick = () => {
    if (location.pathname === '/review-case') {
      onClose && onClose();
      return;
    }
    navigate('/review-case');
  };

  const handlePdfReportClick = () => {
    if (location.pathname === '/pdf-report') {
      onClose && onClose();
      return;
    }
    navigate('/pdf-report');
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
      <SidebarButton onClick={handleAddCaseClick}>
        Add New Case
      </SidebarButton>
      <SidebarButton onClick={handleReviewCaseClick}>
        Review Old Case
      </SidebarButton>
      <SidebarButton onClick={handlePdfReportClick}>
        PDF Report
      </SidebarButton>
    </div>
  );
}

export default Sidebar;