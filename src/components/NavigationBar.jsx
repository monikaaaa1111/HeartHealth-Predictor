// src/components/NavigationBar.jsx
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './NavigationBar.css';

const NavigationBar = () => {
  return (
    <header className="nav">
      <div className="nav__logo">
        <Link to="/">HeartHealth</Link>
      </div>

      <nav className="nav__links">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/predict">
          Check My Risk
        </NavLink>
      </nav>
    </header>
  );
};

export default NavigationBar;
