import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./Homepage.css";

const Homepage = () => {
  // -----------------------------
  // Typing effect
  // -----------------------------
  const text = "Take a 2-minute check on your heart health";
  const [typedText, setTypedText] = useState("");
  const indexRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTypedText(text.slice(0, indexRef.current));
      indexRef.current++;
      if (indexRef.current > text.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  // -----------------------------
  // Animated counters
  // -----------------------------
  const [models, setModels] = useState(0);
  const [fields, setFields] = useState(0);
  const [accuracy, setAccuracy] = useState(0);

  useEffect(() => {
    let m = 0, f = 0, a = 0;

    const interval = setInterval(() => {
      if (m < 5) setModels(++m);
      if (f < 20) setFields(++f);
      if (a < 92) setAccuracy(++a);

      if (m === 5 && f === 20 && a === 92) clearInterval(interval);
    }, 30);

    return () => clearInterval(interval);
  }, []);

  // -----------------------------
  // Scroll fade-in logic
  // -----------------------------
  useEffect(() => {
    const revealElements = document.querySelectorAll(".fade-in");

    const handleScroll = () => {
      revealElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) el.classList.add("show");
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // -----------------------------
  // Data-driven facts section
  // -----------------------------
  const facts = [
    { title: "1 in 5", desc: "Adults have some form of heart disease." },
    { title: "80%", desc: "Of heart disease is preventable." },
    { title: "No symptoms", desc: "Most risk develops silently." },
  ];

  return (
    <main className="home">
      {/* HERO */}
      <section className="home_hero fade-in">
        <div className="home_hero-text">
          <h1>{typedText}</h1>

          <p>
            Your daily choices - movement, food, stress, sleep - quietly change
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

          {/* Animated counters */}
          <div className="home__stats">
            <div className="home__stat-card">
              <span className="home__stat-label">Models</span>
              <span className="home__stat-value">{models}+</span>
              <span className="home__stat-sub">ML algorithms running</span>
            </div>
            <div className="home__stat-card">
              <span className="home__stat-label">Input fields</span>
              <span className="home__stat-value">{fields}</span>
              <span className="home__stat-sub">Lifestyle + medical history</span>
            </div>
            <div className="home__stat-card">
              <span className="home__stat-label">Accuracy</span>
              <span className="home__stat-value">{accuracy}%</span>
              <span className="home__stat-sub">Dataset performance</span>
            </div>
          </div>
        </div>

        {/* Right hero card */}
        <div className="home__hero-card">
          <div className="home__heart-circle">❤️</div>
          <h2>Why check now?</h2>
          <p>
            Heart disease often develops silently over years. Small changes in
            blood pressure, activity level, and diet add up.
          </p>
          <ul>
            {facts.map((fact, i) => (
              <li key={i}>
                <strong>{fact.title}</strong> — {fact.desc}
              </li>
            ))}
          </ul>
          <Link to="/predict" className="home__btn-mini">
            Start assessment
          </Link>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="home__section fade-in">
        <h2>How this tool works</h2>
        <p className="home__section-intro">
          Behind the scenes, your answers are sent to a backend API where
          multiple machine learning models estimate your likelihood of heart
          disease based on patterns in a large public health dataset.
        </p>

        <div className="home__cards">
          <StepCard
            title="1. You answer simple questions"
            desc="We ask about blood pressure, cholesterol, physical activity, smoking, alcohol, weight, and overall health. No name or login needed."
          />
          <StepCard
            title="2. Models estimate your risk"
            desc="The backend runs Logistic Regression, KNN, Decision Trees, Random Forest, and CatBoost and generates a consensus prediction."
          />
          <StepCard
            title="3. You get an easy summary"
            desc="We highlight whether your current lifestyle patterns suggest low or elevated risk."
          />
        </div>
      </section>
    </main>
  );
};

// Component with JS logic (adds more JS weight)
const StepCard = ({ title, desc }) => {
  return (
    <div className="home__card fade-in">
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
};

export default Homepage;
