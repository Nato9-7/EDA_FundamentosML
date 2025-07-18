import React from 'react';
import ClasificacionForm from './ClasificacionForm';
import RegresionForm from './RegresionForm';

const MLModal = ({ 
  showClasificacion, 
  showRegresion, 
  onClose, 
  playHoverSound 
}) => {
  if (!showClasificacion && !showRegresion) return null;

  const handleOverlayClick = (e) => {
    if (e.target.className === 'form-overlay') {
      onClose();
    }
  };

  return (
    <div className="form-overlay" onClick={handleOverlayClick}>
      <div className="form-wrapper">
        <div className="form-header">
          <h2>
            {showClasificacion ? 'Predicción de Victoria' : 'Predicción de Kills'}
          </h2>
          <button 
            className="close-button" 
            onClick={onClose}
            onMouseEnter={playHoverSound}
          >
            X
          </button>
        </div>
        {showClasificacion && <ClasificacionForm />}
        {showRegresion && <RegresionForm />}
      </div>
    </div>
  );
};

export default MLModal; 