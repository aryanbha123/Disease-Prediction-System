import React, { useState } from "react";
import axios from "axios";

const ModelBasedForm = () => {
  const [symptoms, setSymptoms] = useState("");
  const [modelIndex, setModelIndex] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const symArray = symptoms.split(",").map((s) => s.trim());
    const res = await axios.post("http://localhost:8000/predict_by_model", {
      model_index: parseInt(modelIndex),
      symptoms: symArray
    });
    setResult(res.data);
  };

  return (
    <div>
      <h2 className="font-semibold text-lg mb-2">Predict using Specific Model</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="number"
          value={modelIndex}
          onChange={(e) => setModelIndex(e.target.value)}
          placeholder="Model Index"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder="Symptoms comma separated"
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded">
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

export default ModelBasedForm;
