from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd  # <-- necesario para usar DataFrame

app = FastAPI()

# Cargar modelos ya entrenados
clf_model = joblib.load("models/clasificacion/random_forest.pkl")
reg_model = joblib.load("models/regresion/mejor_random_forest.pkl")

# Modelo de entrada para clasificación
class ClasificacionInput(BaseModel):
    RoundKills: int
    TeamStartingEquipmentValue: float
    PrimarySniperRifle: float
    RLethalGrenadesThrown: int
    RNonLethalGrenadesThrown: int
    PrimaryHeavy: float
    PrimarySMG: float
    PrimaryPistol: float

# Modelo de entrada para regresión
class RegresionInput(BaseModel):
    TeamStartingEquipmentValue: float
    PrimarySniperRifle: float
    RLethalGrenadesThrown: int
    RNonLethalGrenadesThrown: int
    PrimaryHeavy: float
    PrimarySMG: float
    PrimaryPistol: float

# Endpoint clasificación (victoria o derrota)
@app.post("/predecir_clasificacion")
def predecir_clasificacion(data: ClasificacionInput):
    input_df = pd.DataFrame([data.dict()])  # Convertir input a DataFrame
    pred = clf_model.predict(input_df)
    return {"ganara_partida": bool(pred[0])}

# Endpoint regresión (kills estimados)
@app.post("/predecir_regresion")
def predecir_regresion(data: RegresionInput):
    input_df = pd.DataFrame([data.dict()])  # Convertir input a DataFrame
    pred = reg_model.predict(input_df)
    return {"kills_estimados": float(pred[0])}
