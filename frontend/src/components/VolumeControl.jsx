import React from 'react';
import './VolumeControl.css';

const VolumeControl = ({ 
  volume, 
  showVolumeControl, 
  onVolumeChange, 
  onToggleVolume, 
  playHoverSound 
}) => {
  return (
    <div className="volume-control">
      <button 
        className="volume-button"
        onClick={onToggleVolume}
        onMouseEnter={playHoverSound}
      >
        🔊
      </button>
      {showVolumeControl && (
        <div className="volume-slider-container">
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={onVolumeChange}
            className="volume-slider"
          />
          <span className="volume-value">{Math.round(volume * 100)}%</span>
        </div>
      )}
    </div>
  );
};

export default VolumeControl; 