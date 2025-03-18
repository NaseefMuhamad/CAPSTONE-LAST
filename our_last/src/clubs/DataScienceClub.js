// src/clubs/DataScienceClub.js
import React, { useState, useEffect } from "react";

import dataScienceBanner from '../assets/DataScienceBanner.jpg';
import dataVisualization from '../assets/data-visualization.jpg'; // Section icon
import dataEventImg from '../assets/DataEventImg.webp'; // Event image

function DataScienceClub() {
  const [tip, setTip] = useState("");
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [darkMode, setDarkMode] = useState(true);

  const tips = [
    "Clean your data before analysis.",
    "Visualize trends with charts.",
    "Use cross-validation for better models.",
    "Document your data pipeline.",
    "Explore feature engineering techniques.",
  ];

  const showTip = () => {
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    setTip(randomTip);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`club-page ${darkMode ? "dark-mode" : "light-mode"}`}>
      <header className="club-header">
        <h1>Data Science Club</h1>
        <div className="club-clock">{time}</div>
        <button className="btn toggle-btn" onClick={toggleDarkMode}>
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>
      </header>

      <section className="club-banner-section">
        <img src={dataScienceBanner} alt="Data Science Club Banner" className="club-banner" />
      </section>

      <section className="club-section">
        <h2><img src={dataVisualization} alt="Chart Icon" className="club-icon" />What is Data Science Club?</h2>
        <p>
          Data Science Club explores data analysis, machine learning, and visualization to uncover insights and solve problems.
        </p>
        <h3>Club President</h3>
        <p>Lisa Nguyen</p>
        <h3>Participants</h3>
        <ul>
          <li>James Carter</li>
          <li>Amy Wu</li>
          <li>Raj Patel</li>
        </ul>
      </section>

      <section className="club-section">
        <h2><img src={dataVisualization} alt="Tips Icon" className="club-icon" />Data Science Tips</h2>
        <p>Click below for a random tip to boost your data skills!</p>
        <button className="btn" onClick={showTip}>Get a Tip</button>
        <p className="tip-text">{tip}</p>
      </section>

      <section className="club-section">
        <h2><img src={dataVisualization} alt="Events Icon" className="club-icon" />Upcoming Events</h2>
        <ul>
          <li><img src={dataEventImg} alt="Cleaning Event" className="club-event-img" />Data Cleaning Workshop - April 6th, 2025</li>
          <li><img src={dataEventImg} alt="Hackathon Event" className="club-event-img" />Machine Learning Hackathon - April 15th, 2025</li>
          <li><img src={dataEventImg} alt="Showcase Event" className="club-event-img" />Data Viz Showcase - April 22nd, 2025</li>
        </ul>
      </section>

      

      <footer className="club-footer">
        <p>© 2025 Data Science Club. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default DataScienceClub;