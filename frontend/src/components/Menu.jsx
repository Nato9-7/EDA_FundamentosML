import React from 'react';
import './Menu.css';

const Menu = ({ onClasificacionClick, onRegresionClick, playHoverSound }) => {
  return (
    <ul className="menu">
      <li onMouseEnter={playHoverSound} onClick={onClasificacionClick}>
        Clasificación ML
      </li>
      <li onMouseEnter={playHoverSound} onClick={onRegresionClick}>
        Regresión ML
      </li>
      <li onMouseEnter={playHoverSound}>Find Servers</li>
      <li onMouseEnter={playHoverSound}>Options</li>
      <li onMouseEnter={playHoverSound}>Exit</li>
    </ul>
  );
};

export default Menu; 