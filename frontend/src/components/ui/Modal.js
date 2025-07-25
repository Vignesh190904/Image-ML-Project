import React from 'react';
import './Modal.css';

const Modal = ({
  isOpen,
  title = '',
  children,
  onClose,
  showCloseButton = true,
  width = '400px'
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content"
        style={{ width }}
        onClick={e => e.stopPropagation()}
      >
        {showCloseButton && (
          <button
            className="modal-close"
            aria-label="Close Modal"
            onClick={onClose}
            tabIndex={0}
          >
            &times;
          </button>
        )}
        {title && <h2 className="modal-title">{title}</h2>}
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
