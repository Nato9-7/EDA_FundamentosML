import React, { useState } from 'react';
import Menu from './components/Menu';
import VolumeControl from './components/VolumeControl';
import MLModal from './components/MLModal';
import { useMusic } from './hooks/useMusic';
import './App.css';

function App() {
  const [showClasificacion, setShowClasificacion] = useState(false);
  const [showRegresion, setShowRegresion] = useState(false);
  const [volume, setVolume] = useState(0.1);
  const [showVolumeControl, setShowVolumeControl] = useState(false);

  const { startMusic, playHoverSound } = useMusic(volume);

  const handleClasificacionClick = () => {
    playHoverSound();
    setShowClasificacion(true);
    setShowRegresion(false);
  };

  const handleRegresionClick = () => {
    playHoverSound();
    setShowRegresion(true);
    setShowClasificacion(false);
  };

  const handleCloseForm = () => {
    setShowClasificacion(false);
    setShowRegresion(false);
  };

  const toggleVolumeControl = () => {
    setShowVolumeControl(!showVolumeControl);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  return (
    <div
      className="menu-container"
      onClick={startMusic}
      onMouseMove={startMusic}
    >
      <Menu 
        onClasificacionClick={handleClasificacionClick}
        onRegresionClick={handleRegresionClick}
        playHoverSound={playHoverSound}
      />

      <VolumeControl 
        volume={volume}
        showVolumeControl={showVolumeControl}
        onVolumeChange={handleVolumeChange}
        onToggleVolume={toggleVolumeControl}
        playHoverSound={playHoverSound}
      />

      <MLModal 
        showClasificacion={showClasificacion}
        showRegresion={showRegresion}
        onClose={handleCloseForm}
        playHoverSound={playHoverSound}
      />
    </div>
  );
}

export default App;
