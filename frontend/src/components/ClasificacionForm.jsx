import React, { useState } from 'react';
import { predictionService } from '../services/api';
import './ClasificacionForm.css';

const ClasificacionForm = () => {
  const [formData, setFormData] = useState({
    RoundKills: 90,
    TeamStartingEquipmentValue: 30000,
    PrimarySniperRifle: 0.2,
    RLethalGrenadesThrown: 25,
    RNonLethalGrenadesThrown: 30,
    PrimaryHeavy: 0.1,
    PrimarySMG: 0.1,
    PrimaryPistol: 0.1,
  });

  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  const playHoverSound = () => {
    const hoverAudio = new Audio('/sound/hover.mp3');
    hoverAudio.volume = 0.1;
    hoverAudio.play();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await predictionService.predecirClasificacion(formData);
      setResultado(response);
    } catch (error) {
      console.error('Error:', error);
      setResultado({ error: 'Error al hacer la predicción' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ml-predictor-form">
      <form onSubmit={handleSubmit} className="cs-form">
        <div className="form-grid">
          <div className="form-group">
            <label>Kills del Equipo:</label>
            <input
              type="number"
              name="RoundKills"
              value={formData.RoundKills}
              onChange={handleInputChange}
              onMouseEnter={playHoverSound}
              className="cs-input"
            />
          </div>

          <div className="form-group">
            <label>Valor del Equipamiento:</label>
            <input
              type="number"
              name="TeamStartingEquipmentValue"
              value={formData.TeamStartingEquipmentValue}
              onChange={handleInputChange}
              onMouseEnter={playHoverSound}
              className="cs-input"
            />
          </div>

          <div className="form-group">
            <label>Uso de Francotirador (%):</label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="1"
              name="PrimarySniperRifle"
              value={formData.PrimarySniperRifle}
              onChange={handleInputChange}
              onMouseEnter={playHoverSound}
              className="cs-input"
            />
          </div>

          <div className="form-group">
            <label>Granadas Letales:</label>
            <input
              type="number"
              name="RLethalGrenadesThrown"
              value={formData.RLethalGrenadesThrown}
              onChange={handleInputChange}
              onMouseEnter={playHoverSound}
              className="cs-input"
            />
          </div>

          <div className="form-group">
            <label>Granadas No Letales:</label>
            <input
              type="number"
              name="RNonLethalGrenadesThrown"
              value={formData.RNonLethalGrenadesThrown}
              onChange={handleInputChange}
              onMouseEnter={playHoverSound}
              className="cs-input"
            />
          </div>

          <div className="form-group">
            <label>Uso de Armas Pesadas (%):</label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="1"
              name="PrimaryHeavy"
              value={formData.PrimaryHeavy}
              onChange={handleInputChange}
              onMouseEnter={playHoverSound}
              className="cs-input"
            />
          </div>

          <div className="form-group">
            <label>Uso de SMG (%):</label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="1"
              name="PrimarySMG"
              value={formData.PrimarySMG}
              onChange={handleInputChange}
              onMouseEnter={playHoverSound}
              className="cs-input"
            />
          </div>

          <div className="form-group">
            <label>Uso de Pistola (%):</label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="1"
              name="PrimaryPistol"
              value={formData.PrimaryPistol}
              onChange={handleInputChange}
              onMouseEnter={playHoverSound}
              className="cs-input"
            />
          </div>
        </div>

        <div className="form-buttons">
          <button 
            type="submit" 
            disabled={loading}
            onMouseEnter={playHoverSound}
            className="cs-button"
          >
            {loading ? 'Prediciendo...' : 'Predecir Victoria'}
          </button>
        </div>
      </form>

      {resultado && (
        <div className="resultado-prediccion">
          <h3>Resultado de la Predicción:</h3>
          {resultado.error ? (
            <p className="error-message">{resultado.error}</p>
          ) : (
            <div className="prediction-result">
              <p className={`result ${resultado.ganara_partida ? 'victory' : 'defeat'}`}>
                <strong>¿Ganará la partida?</strong> {resultado.ganara_partida ? 'SÍ' : 'NO'}
              </p>
              {resultado.probabilidad_ganar && (
                <p className="probability">
                  <strong>Probabilidad de ganar:</strong> {(resultado.probabilidad_ganar * 100).toFixed(1)}%
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ClasificacionForm;
