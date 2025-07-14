from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np

app = FastAPI()

# Cargar modelos
clf_model = joblib.load("models/clasificacion/decision_tree_classifier_model.pkl")
reg_model = joblib.load("models/regresion/decision_tree_regressor_model.pkl")

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

@app.post("/predecir_clasificacion")
def predecir_clasificacion(data: ClasificacionInput):
    X = np.array([[data.RoundKills,
                   data.TeamStartingEquipmentValue,
                   data.PrimarySniperRifle,
                   data.RLethalGrenadesThrown,
                   data.RNonLethalGrenadesThrown,
                   data.PrimaryHeavy,
                   data.PrimarySMG,
                   data.PrimaryPistol]])
    pred = clf_model.predict(X)
    return {"ganara_partida": bool(pred[0])}

@app.post("/predecir_regresion")
def predecir_regresion(data: RegresionInput):
    X = np.array([[data.TeamStartingEquipmentValue,
                   data.PrimarySniperRifle,
                   data.RLethalGrenadesThrown,
                   data.RNonLethalGrenadesThrown,
                   data.PrimaryHeavy,
                   data.PrimarySMG,
                   data.PrimaryPistol]])
    pred = reg_model.predict(X)
    return {"kills_estimados": float(pred[0])} 