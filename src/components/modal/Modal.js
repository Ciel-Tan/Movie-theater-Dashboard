'use client';
import React, { useState, useEffect } from 'react';
import '@/styles/modal.css';

export default function Modal({ isOpen, title, children, onClose }) {
  // track whether we should render at all
  const [render, setRender] = useState(isOpen);
  // track whether we're in the “exit” phase
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setRender(true);
    }
    else if (render) {
      // closing: trigger exit animation, then unmount
      setExiting(true);
      const t = setTimeout(() => {
        setExiting(false);
        setRender(false);
      }, 250); // match your CSS duration
      return () => clearTimeout(t);
    }
  }, [isOpen, render]);

  if (!render) return null;

  const handleClose = () => onClose();

  return (
    <div
      className={`modal-backdrop ${exiting ? 'fade-out' : 'fade-in'}`}
      onClick={handleClose}
    >
      <div
        className={`modal-content ${exiting ? 'scale-out' : 'scale-in'}`}
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>{title}</h2>
          <button onClick={handleClose} className="close-button">✕</button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}
