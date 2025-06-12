from flask import Flask, request, jsonify
import pandas as pd
import joblib
from flask_cors import CORS  # import CORS

app = Flask(__name__)
CORS(app)  # enable CORS for all routes

# Load your trained models
fuel_model = joblib.load("ml-models/best_fuel_model.joblib")
co2_model = joblib.load("ml-models/best_co2_model.joblib")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    try:
        # Prepare vehicle_type one-hot encoding manually
        vehicle_type = data.get("vehicle_type", "").lower()
        vehicle_type_diesel = 1 if vehicle_type == "diesel" else 0
        vehicle_type_electric = 1 if vehicle_type == "electric" else 0
        vehicle_type_petrol = 1 if vehicle_type == "petrol" else 0

        # Construct input DataFrame with all expected features
        input_df = pd.DataFrame([{
            "distance_km": data["distance_km"],
            "elevation_gain_m": data["elevation_gain_m"],
            "traffic_level": data["traffic_level"],
            "vehicle_type_diesel": vehicle_type_diesel,
            "vehicle_type_electric": vehicle_type_electric,
            "vehicle_type_petrol": vehicle_type_petrol
        }])

       # Predict fuel and CO2
        fuel_prediction = float(fuel_model.predict(input_df)[0])
        co2_prediction = float(co2_model.predict(input_df)[0])

        return jsonify({
            "fuel_used_l": round(fuel_prediction, 2),
            "co2_emitted_kg": round(co2_prediction, 2)
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)
