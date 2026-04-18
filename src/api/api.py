from flask import Flask, request, jsonify
import numpy as np
from flask_cors import CORS
import joblib
import json
import statistics

# Load models & data
rf_model = joblib.load("rf_model.pkl")
nb_model = joblib.load("nb_model.pkl")
svm_model = joblib.load("svm_model.pkl")
encoder = joblib.load("label_encoder.pkl")

with open("symptom_index.json") as f:
    symptom_index = json.load(f)

prediction_classes = encoder.classes_

app = Flask(__name__)
CORS(app)

# Helper function
def predict_disease(symptoms):
    symptoms = symptoms.split(",")

    input_data = [0] * len(symptom_index)
    for symptom in symptoms:
        formatted = " ".join([i.capitalize() for i in symptom.strip().split("_")])
        if formatted in symptom_index:
            index = symptom_index[formatted]
            input_data[index] = 1
        else:
            return {"error": f"Symptom not found: {formatted}"}

    input_data = np.array(input_data).reshape(1, -1)

    rf_pred = prediction_classes[rf_model.predict(input_data)[0]]
    nb_pred = prediction_classes[nb_model.predict(input_data)[0]]
    svm_pred = prediction_classes[svm_model.predict(input_data)[0]]
    
    final_pred = statistics.mode([rf_pred, nb_pred, svm_pred]) 

    return {
        "rf_model_prediction": rf_pred,
        "naive_bayes_prediction": nb_pred,
        "svm_model_prediction": svm_pred,
        "final_prediction": final_pred
    }

# API route
@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    symptoms = data.get("symptoms")

    if not symptoms:
        return jsonify({"error": "No symptoms provided"}), 400

    result = predict_disease(symptoms)
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)
