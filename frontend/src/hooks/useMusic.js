import { useEffect, useRef, useState } from 'react';

export const useMusic = (volume) => {
  const musicRef = useRef(null);
  const [musicStarted, setMusicStarted] = useState(false);

  useEffect(() => {
    musicRef.current = new Audio('/sound/menu-music.mp3');
    musicRef.current.loop = true;
    musicRef.current.volume = volume;
  }, []);

  useEffect(() => {
    if (musicRef.current) {
      musicRef.current.volume = volume;
      if (volume === 0) {
        musicRef.current.pause();
        musicRef.current.currentTime = 0;
        setMusicStarted(false);
      } else if (musicStarted) {
        // Si la música estaba sonando y el volumen sube de 0, reiniciar
        musicRef.current.pause();
        musicRef.current.currentTime = 0;
        musicRef.current.play().catch(() => {});
      }
    }
    // eslint-disable-next-line
  }, [volume]);

  const startMusic = () => {
    if (musicRef.current && volume > 0) {
      musicRef.current.currentTime = 0;
      musicRef.current.play().catch(() => {
        console.log('El autoplay fue bloqueado');
      });
      setMusicStarted(true);
    }
  };

  const playHoverSound = () => {
    const hoverAudio = new Audio('/sound/hover.mp3');
    hoverAudio.volume = volume;
    hoverAudio.play();
    if (!musicStarted && volume > 0) startMusic();
  };

  return {
    startMusic,
    playHoverSound,
    musicStarted
  };
}; 