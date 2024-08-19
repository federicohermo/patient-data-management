// src/components/Notification.tsx

import React, { useEffect } from 'react';
import '../styles/Notification.css';

interface NotificationProps {
  message: string;
  type: string;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Automatically close the notification after 3 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`notification ${type}`}>
      {message}
      <button className="closeButtonNotification" onClick={onClose}>
        &times;
      </button>
    </div>
  );
};

export default Notification;
