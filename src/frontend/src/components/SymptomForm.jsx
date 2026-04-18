import React, { useState } from "react";
import axios from "axios";

const allSymptoms = [
  "muscle_pain", "high_fever", "vomiting", "joint_pain", "fatigue", "nausea",
  "itching", "dark_urine", "mild_fever", "yellowing_of_eyes", "diarrhoea", "headache",
  "abdominal_pain", "chills", "sweating", "malaise", "weight_loss", "loss_of_appetite",
  "chest_pain", "family_history", "abnormal_menstruation", "yellowish_skin",
  "breathlessness", "red_spots_over_body", "blood_in_sputum", "rusty_sputum",
  "cough", "receiving_blood_transfusion", "stomach_bleeding", "indigestion"
];

const SymptomForm = () => {
  const [selected, setSelected] = useState([]);
  const [result, setResult] = useState(null);

  const handleCheckbox = (symptom) => {
    setSelected((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:8000/predict", { symptoms: selected });
    setResult(res.data);
  };

  return (
    <div>
      <h2 className="font-semibold text-lg mb-2">Predict via Symptom Checklist</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-60 overflow-y-auto border p-2 rounded">
          {allSymptoms.map((sym) => (
            <label key={sym} className="flex items-center space-x-2">
              <input type="checkbox" value={sym} onChange={() => handleCheckbox(sym)} />
              <span>{sym.replace(/_/g, " ")}</span>
            </label>
          ))}
        </div>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Predict
        </button>
      </form>
      {result && (
        <div className="mt-4 p-3 border rounded bg-gray-100">
          <p><strong>Predicted Disease:</strong> {result.predicted_disease}</p>
        </div>
      )}
    </div>
  );
};

export default SymptomForm;
