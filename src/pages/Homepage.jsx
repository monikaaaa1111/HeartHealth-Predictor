// src/pages/Homepage.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Homepage.css";

const Homepage = () => {
  return (
    <main className="home">
      {/* HERO */}
      <section className="home__hero">
        <div className="home__hero-text">
          <h1>Take a 2-minute check on your heart health</h1>
          <p>
            Your daily choices — movement, food, stress, sleep — quietly change
            your heart disease risk. This tool uses real health survey data and
            machine learning models to give you an early indication of risk.
          </p>

          <div className="home__hero-actions">
            <Link to="/predict" className="home__btn home__btn--primary">
              Check my risk
            </Link>
            <a href="#how-it-works" className="home__btn home__btn--ghost">
              How it works
            </a>
          </div>

          <div className="home__stats">
            <div className="home__stat-card">
              <span className="home__stat-label">Models</span>
              <span className="home__stat-value">5+</span>
              <span className="home__stat-sub">Logistic, KNN, Trees & more</span>
            </div>
            <div className="home__stat-card">
              <span className="home__stat-label">Input fields</span>
              <span className="home__stat-value">20</span>
              <span className="home__stat-sub">Lifestyle & medical history</span>
            </div>
            <div className="home__stat-card">
              <span className="home__stat-label">Goal</span>
              <span className="home__stat-value">Awareness</span>
              <span className="home__stat-sub">Not a diagnosis</span>
            </div>
          </div>
        </div>

        <div className="home__hero-card">
          <div className="home__heart-circle">❤️</div>
          <h2>Why check now?</h2>
          <p>
            Heart disease often develops silently over years. Small changes in
            blood pressure, activity level, and diet add up.
          </p>
          <ul>
            <li>Spot potential risk earlier</li>
            <li>See which habits matter most</li>
            <li>Use results as a starting point for a doctor visit</li>
          </ul>
          <Link to="/predict" className="home__btn-mini">
            Start assessment
          </Link>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="home__section">
        <h2>How this tool works</h2>
        <p className="home__section-intro">
          Behind the scenes, your answers are sent to a backend API where
          multiple machine learning models estimate your likelihood of heart
          disease based on patterns in a large public health dataset.
        </p>

        <div className="home__cards">
          <div className="home__card">
            <h3>1. You answer simple questions</h3>
            <p>
              We ask about blood pressure, cholesterol, physical activity,
              smoking, alcohol, weight, and overall health. No name, email, or
              personal ID is required.
            </p>
          </div>

          <div className="home__card">
            <h3>2. Models estimate your risk</h3>
            <p>
              The backend runs several models (logistic regression, KNN,
              decision trees, random forests, CatBoost, etc.) and combines their
              predictions into a single consensus score.
            </p>
          </div>

          <div className="home__card">
            <h3>3. You get an easy summary</h3>
            <p>
              We highlight whether you appear at lower or higher risk and which
              categories (lifestyle, medical history, access to care) are most
              important to focus on.
            </p>
          </div>
        </div>
      </section>

      {/* TIPS / DISCLAIMER */}
      <section className="home__section home__section--split">
        <div>
          <h2>Make the most of your results</h2>
          <ul className="home__list">
            <li>Use this as a conversation starter with a healthcare provider.</li>
            <li>
              Re-run the tool after lifestyle changes to see how your risk trend
              might shift.
            </li>
            <li>
              Combine this with regular checkups, lab tests, and professional
              advice.
            </li>
          </ul>
        </div>

        <div className="home__disclaimer-card">
          <h3>Important reminder</h3>
          <p>
            This tool is for educational and research purposes only. It does not
            diagnose, treat, or cure any condition.
          </p>
          <p>
            If you have chest pain, shortness of breath, or other concerning
            symptoms, please seek medical help immediately.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Homepage;
