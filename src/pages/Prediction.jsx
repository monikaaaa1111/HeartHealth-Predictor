import React, { useState } from "react";
import "./Prediction.css";

export default function Prediction() {
  const [formData, setFormData] = useState({
    HighBP: 0,
    HighChol: 0,
    CholCheck: 1,
    BMI: 25,
    Smoker: 0,
    Stroke: 0,
    Diabetes: 0,
    PhysActivity: 1,
    Fruits: 1,
    Veggies: 1,
    HvyAlcoholConsump: 0,
    AnyHealthcare: 1,
    NoDocbcCost: 0,
    GenHlth: 3,
    MentHlth: 0,
    PhysHlth: 0,
    DiffWalk: 0,
    Sex: 0,
    Age: 7,
    Education: 4,
    Income: 5,
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: Number(e.target.value)
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("http://localhost:5000/api/predict/all", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      alert("Error connecting to server");
    }

    setLoading(false);
  };

  return (
    <div className="prediction-container">
      <h1>Heart Disease Prediction</h1>

      <div className="form-grid">
        {Object.keys(formData).map((key) => (
          <div className="form-group" key={key}>
            <label>{key}</label>
            <input
              type="number"
              name={key}
              value={formData[key]}
              onChange={handleChange}
            />
          </div>
        ))}
      </div>

      <button className="predict-btn" onClick={handleSubmit} disabled={loading}>
        {loading ? "Predicting..." : "Predict"}
      </button>

      {result && (
        <div className="result-box">
          <h2>Prediction Result</h2>
          <p><b>Consensus:</b> {result.consensus?.label}</p>
          <p><b>Score:</b> {result.consensus?.score}</p>
          <p><b>Models Used:</b> {result.consensus?.models_used.join(", ")}</p>
        </div>
      )}
    </div>
  );
}
