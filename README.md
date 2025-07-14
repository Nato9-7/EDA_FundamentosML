# EDA Fundamentos de Machine Learning - Counter Strike

Este proyecto tiene como objetivo aplicar técnicas de Machine Learning para analizar y predecir resultados de partidas de Counter Strike, utilizando modelos de clasificación y regresión entrenados con estadísticas reales de partidas.

## Estructura del Proyecto

- **Informes/**: Notebooks y reportes de análisis y entrenamiento de modelos.
- **backend/**: Backend en FastAPI para exponer los modelos `.pkl` y realizar predicciones vía API.

## Modelos Disponibles
- **Clasificación**: ¿Podemos predecir si un equipo ganará la partida según estadísticas como kills, valor de equipamiento, uso de armas, etc.?
- **Regresión**: ¿Podemos predecir el número de kills de un equipo en una partida según sus estadísticas iniciales?

## Cómo iniciar el backend (FastAPI)

1. Instala las dependencias:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. Ejecuta el servidor:
   ```bash
   uvicorn main:app --reload
   ```

3. Abre la documentación interactiva para probar los endpoints:
   [http://localhost:8000/docs](http://localhost:8000/docs)

## Ejemplo de uso de los endpoints

### Clasificación
```json
{
  "RoundKills": 90,
  "TeamStartingEquipmentValue": 30000,
  "PrimarySniperRifle": 0.2,
  "RLethalGrenadesThrown": 25,
  "RNonLethalGrenadesThrown": 30,
  "PrimaryHeavy": 0.1,
  "PrimarySMG": 0.1,
  "PrimaryPistol": 0.1
}
```

### Regresión
```json
{
  "TeamStartingEquipmentValue": 30000,
  "PrimarySniperRifle": 0.2,
  "RLethalGrenadesThrown": 25,
  "RNonLethalGrenadesThrown": 30,
  "PrimaryHeavy": 0.1,
  "PrimarySMG": 0.1,
  "PrimaryPistol": 0.1
}
```

---

**Recuerda:** Los valores de entrada deben estar en rangos realistas (por ejemplo, el valor de equipamiento entre 0 y 32000).



