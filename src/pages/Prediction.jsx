import React, { useState } from "react";
import "./Prediction.css";

const Prediction = () => {
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

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    // everything is numeric on backend
    setFormData((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("http://localhost:5000/api/predict/all", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || "Something went wrong");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message || "Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="predict">
      <section className="predict__layout">
        {/* Left side: description */}
        <div className="predict__intro">
          <h1>Check Your Heart Disease Risk</h1>
          <p>
            This tool estimates the risk of heart disease based on lifestyle,
            medical history, and general health information. Your answers are
            processed by several machine learning models running on the backend.
          </p>
          <ul className="predict__bullets">
            <li>✔ No personal identifiers are collected</li>
            <li>✔ You can adjust values and re-run as many times as you want</li>
            <li>✔ Talk to a healthcare professional for real medical advice</li>
          </ul>

          <div className="predict__disclaimer">
            This is an educational tool and not a medical diagnosis. If you are
            worried about your heart health, please speak with a doctor.
          </div>
        </div>

        {/* Right side: form */}
        <div className="predict__card">
          <h2>Enter Your Information</h2>

          <form onSubmit={handleSubmit} className="predict__form">
            {/* Basic info */}
            <div className="predict__section">
              <h3>Basic Information</h3>
              <div className="predict__grid">
                <div className="field">
                  <label>Sex</label>
                  <select
                    name="Sex"
                    value={formData.Sex}
                    onChange={handleChange}
                  >
                    <option value={0}>Female</option>
                    <option value={1}>Male</option>
                  </select>
                  <small>0 = Female, 1 = Male</small>
                </div>

                <div className="field">
                  <label>Age Group</label>
                  <select
                    name="Age"
                    value={formData.Age}
                    onChange={handleChange}
                  >
                    <option value={1}>18–24</option>
                    <option value={2}>25–29</option>
                    <option value={3}>30–34</option>
                    <option value={4}>35–39</option>
                    <option value={5}>40–44</option>
                    <option value={6}>45–49</option>
                    <option value={7}>50–54</option>
                    <option value={8}>55–59</option>
                    <option value={9}>60–64</option>
                    <option value={10}>65–69</option>
                    <option value={11}>70–74</option>
                    <option value={12}>75–79</option>
                    <option value={13}>80 or older</option>
                  </select>
                  <small>Encoded as 1–13</small>
                </div>

                <div className="field">
                  <label>BMI</label>
                  <input
                    type="number"
                    step="0.1"
                    name="BMI"
                    value={formData.BMI}
                    onChange={handleChange}
                  />
                  <small>Body Mass Index</small>
                </div>

                <div className="field">
                  <label>General Health</label>
                  <select
                    name="GenHlth"
                    value={formData.GenHlth}
                    onChange={handleChange}
                  >
                    <option value={1}>Excellent</option>
                    <option value={2}>Very good</option>
                    <option value={3}>Good</option>
                    <option value={4}>Fair</option>
                    <option value={5}>Poor</option>
                  </select>
                  <small>1 = Best, 5 = Worst</small>
                </div>

                <div className="field">
                  <label>Mental Health (days / month)</label>
                  <input
                    type="number"
                    min="0"
                    max="30"
                    name="MentHlth"
                    value={formData.MentHlth}
                    onChange={handleChange}
                  />
                </div>

                <div className="field">
                  <label>Physical Health (days / month)</label>
                  <input
                    type="number"
                    min="0"
                    max="30"
                    name="PhysHlth"
                    value={formData.PhysHlth}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Lifestyle */}
            <div className="predict__section">
              <h3>Lifestyle Habits</h3>
              <div className="predict__grid">
                <YesNo
                  label="Current smoker?"
                  name="Smoker"
                  value={formData.Smoker}
                  onChange={handleChange}
                />
                <YesNo
                  label="Heavy alcohol consumption?"
                  name="HvyAlcoholConsump"
                  value={formData.HvyAlcoholConsump}
                  onChange={handleChange}
                />
                <YesNo
                  label="Physical activity in past 30 days?"
                  name="PhysActivity"
                  value={formData.PhysActivity}
                  onChange={handleChange}
                />
                <YesNo
                  label="Eat fruits regularly?"
                  name="Fruits"
                  value={formData.Fruits}
                  onChange={handleChange}
                />
                <YesNo
                  label="Eat vegetables regularly?"
                  name="Veggies"
                  value={formData.Veggies}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Medical history */}
            <div className="predict__section">
              <h3>Medical History</h3>
              <div className="predict__grid">
                <YesNo
                  label="High blood pressure (diagnosed)?"
                  name="HighBP"
                  value={formData.HighBP}
                  onChange={handleChange}
                />
                <YesNo
                  label="High cholesterol (diagnosed)?"
                  name="HighChol"
                  value={formData.HighChol}
                  onChange={handleChange}
                />
                <YesNo
                  label="Cholesterol check in last 5 years?"
                  name="CholCheck"
                  value={formData.CholCheck}
                  onChange={handleChange}
                />
                <YesNo
                  label="History of stroke?"
                  name="Stroke"
                  value={formData.Stroke}
                  onChange={handleChange}
                />
                <YesNo
                  label="Diabetes?"
                  name="Diabetes"
                  value={formData.Diabetes}
                  onChange={handleChange}
                />
                <YesNo
                  label="Serious difficulty walking/climbing stairs?"
                  name="DiffWalk"
                  value={formData.DiffWalk}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Access / socio-economic */}
            <div className="predict__section">
              <h3>Healthcare & Income</h3>
              <div className="predict__grid">
                <YesNo
                  label="Any kind of health coverage?"
                  name="AnyHealthcare"
                  value={formData.AnyHealthcare}
                  onChange={handleChange}
                />
                <YesNo
                  label="Needed doctor but couldn’t afford (last 12 months)?"
                  name="NoDocbcCost"
                  value={formData.NoDocbcCost}
                  onChange={handleChange}
                />

                <div className="field">
                  <label>Education Level</label>
                  <select
                    name="Education"
                    value={formData.Education}
                    onChange={handleChange}
                  >
                    <option value={1}>Never attended / only kindergarten</option>
                    <option value={2}>Grades 1–8</option>
                    <option value={3}>Some high school</option>
                    <option value={4}>High school graduate</option>
                    <option value={5}>Some college / technical school</option>
                    <option value={6}>College graduate</option>
                  </select>
                </div>

                <div className="field">
                  <label>Household Income</label>
                  <select
                    name="Income"
                    value={formData.Income}
                    onChange={handleChange}
                  >
                    <option value={1}>Less than $10,000</option>
                    <option value={2}>$10,000–$15,000</option>
                    <option value={3}>$15,000–$20,000</option>
                    <option value={4}>$20,000–$25,000</option>
                    <option value={5}>$25,000–$35,000</option>
                    <option value={6}>$35,000–$50,000</option>
                    <option value={7}>$50,000–$75,000</option>
                    <option value={8}>$75,000 or more</option>
                  </select>
                </div>
              </div>
            </div>

            {error && <div className="predict__error">{error}</div>}

            <button
              type="submit"
              className="predict__button"
              disabled={loading}
            >
              {loading ? "Running models..." : "Predict Heart Disease Risk"}
            </button>
          </form>

          {result && (
            <div className="predict__result">
              <h3>Prediction Summary</h3>
              <p className="predict__result-label">
                <span
                  className={
                    result.consensus?.label === "At risk"
                      ? "badge badge--high"
                      : "badge badge--low"
                  }
                >
                  {result.consensus?.label || "Unknown"}
                </span>
              </p>
              <p>
                <strong>Consensus score:</strong>{" "}
                {result.consensus?.score?.toFixed(2)}
              </p>
              <p>
                <strong>Models used:</strong>{" "}
                {result.consensus?.models_used?.join(", ")}
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

// Small reusable Yes / No component
const YesNo = ({ label, name, value, onChange }) => {
  return (
    <div className="field">
      <label>{label}</label>
      <div className="field__yesno">
        <label>
          <input
            type="radio"
            name={name}
            value={1}
            checked={value === 1}
            onChange={onChange}
          />
          Yes
        </label>
        <label>
          <input
            type="radio"
            name={name}
            value={0}
            checked={value === 0}
            onChange={onChange}
          />
          No
        </label>
      </div>
      <small>0 = No, 1 = Yes</small>
    </div>
  );
};

export default Prediction;
