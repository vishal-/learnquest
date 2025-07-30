import React from 'react';
import { HiX } from 'react-icons/hi';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, children }) => {
  const drawerStyles: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: isOpen ? '0' : '-100%',
    height: '100%',
    width: '250px',
    backgroundColor: 'white',
    boxShadow: '2px 0 5px rgba(0,0,0,0.5)',
    transition: 'left 0.3s ease-in-out',
    zIndex: 100,
    overflowY: 'auto',
  };

  const overlayStyles: React.CSSProperties = {
    display: isOpen ? 'block' : 'none',
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 99,
  };

  return (
    <>
      <div style={overlayStyles} onClick={onClose}></div>
      <div style={drawerStyles}>
        <button onClick={onClose} style={{ float: 'right', margin: '10px' }}>
          <HiX className="h-5 w-5" />
        </button>
        {children}
      </div>
    </>
  );
};

export default Drawer;
