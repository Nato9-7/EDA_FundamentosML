import axios from 'axios';

// Configurar la URL base de tu backend
const API_BASE_URL = 'http://localhost:8000';

// Crear instancia de axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Servicios para las predicciones
export const predictionService = {
  // Clasificación
  predecirClasificacion: async (data) => {
    try {
      const response = await api.post('/predecir_clasificacion', data);
      return response.data;
    } catch (error) {
      console.error('Error en clasificación:', error);
      throw error;
    }
  },

  // Regresión
  predecirRegresion: async (data) => {
    try {
      const response = await api.post('/predecir_regresion', data);
      return response.data;
    } catch (error) {
      console.error('Error en regresión:', error);
      throw error;
    }
  },
};
