// src/components/Modal.tsx

import React from 'react';
import '../styles/Modal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: string;
  darkMode?: boolean;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, size, darkMode }) => {
  if (!isOpen) return null;

  return (
    <div className="modalOverlay">
      <div className={`modalContent ${size} ${darkMode ? 'dark-mode' : ''}`}>
        <button className={`closeButton ${darkMode ? 'dark-mode' : ''}`} onClick={onClose}>✕</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
