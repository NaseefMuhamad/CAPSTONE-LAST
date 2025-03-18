// src/clubs/DataScienceClub.js
import React, { useState, useEffect } from "react";
import JoinForm from "../components/JoinForm";
import dataScienceBanner from '../assets/DataScienceBanner.jpg'; // Ensure this exists

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
        <h2>What is Data Science Club?</h2>
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
        <h2>Data Science Tips</h2>
        <p>Click below for a random tip to boost your data skills!</p>
        <button className="btn" onClick={showTip}>
          Get a Tip
        </button>
        <p className="tip-text">{tip}</p>
      </section>

      <section className="club-section">
        <h2>Upcoming Events</h2>
        <ul>
          <li>Data Cleaning Workshop - April 6th, 2025</li>
          <li>Machine Learning Hackathon - April 15th, 2025</li>
          <li>Data Viz Showcase - April 22nd, 2025</li>
        </ul>
      </section>

      <JoinForm clubName="datascience" />

      <footer className="club-footer">
        <p>© 2025 Data Science Club. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default DataScienceClub;