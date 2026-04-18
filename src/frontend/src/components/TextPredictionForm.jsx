import React, { useState } from "react";
import axios from "axios";

const TextPredictionForm = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:8000/extract_symptoms", { text });
    setResult(res.data);
  };
  const suggestions = [
    "I have been feeling tired and have a high fever.",
    "I'm experiencing nausea and vomiting since last night.",
    "I noticed yellowing of my eyes and dark urine.",
    "I have a severe headache with chills and sweating.",
    "I'm coughing continuously with blood in my sputum.",
    "I feel pain in my joints and muscles with mild fever.",
    "I’m having abdominal pain and diarrhoea.",
    "There are red spots over my body and I feel weak.",
    "I'm having trouble breathing and chest pain.",
    "I feel dizzy, lost my appetite, and I’m losing weight."
  ];
  
  return (
    <div>
       
      <h2 className="font-semibold text-lg mb-2">Predict via Text Input</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <textarea
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your symptoms..."
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Predict
        </button>
      </form>
      {result && (
        <div className="mt-4 p-3 border rounded bg-gray-100">
          <p><strong>Extracted Symptoms:</strong> {result.extracted_symptoms.join(", ")}</p>
          <p><strong>Predicted Disease:</strong> {result.predicted_disease}</p>
        </div>
      )}
      {suggestions.map((i,k) => (
        <>
        <div onClick={()=>{setText(i)}} key={k} >
            {i}
        </div>
        </>
      ))}
    </div>
  );
};

export default TextPredictionForm;
