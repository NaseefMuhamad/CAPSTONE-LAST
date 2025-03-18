// src/clubs/RoboticsClub.js
import React, { useState, useEffect } from "react";
import JoinForm from "../components/JoinForm";
import roboticsBanner from '../assets/RoboticsBanner.jpg'; // Ensure this exists

function RoboticsClub() {
  const [tip, setTip] = useState("");
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [darkMode, setDarkMode] = useState(true);

  const tips = [
    "Calibrate your sensors regularly.",
    "Test your code in small increments.",
    "Use modular designs for easy repairs.",
    "Keep spare parts handy during competitions.",
    "Document your wiring and code.",
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
        <h1>Robotics Club</h1>
        <div className="club-clock">{time}</div>
        <button className="btn toggle-btn" onClick={toggleDarkMode}>
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>
      </header>

      <section className="club-banner-section">
        <img src={roboticsBanner} alt="Robotics Club Banner" className="club-banner" />
      </section>

      <section className="club-section">
        <h2>What is Robotics Club?</h2>
        <p>
          Robotics Club is where we design, build, and program robots to solve real-world challenges and compete in events.
        </p>
        <h3>Club President</h3>
        <p>Alex Rivera</p>
        <h3>Participants</h3>
        <ul>
          <li>Sarah Kim</li>
          <li>Mike Patel</li>
          <li>Emma Lopez</li>
        </ul>
      </section>

      <section className="club-section">
        <h2>Robotics Tips</h2>
        <p>Click below for a random tip to up your robotics game!</p>
        <button className="btn" onClick={showTip}>
          Get a Tip
        </button>
        <p className="tip-text">{tip}</p>
      </section>

      <section className="club-section">
        <h2>Upcoming Events</h2>
        <ul>
          <li>Robot Build Workshop - April 5th, 2025</li>
          <li>Competition Prep - April 12th, 2025</li>
          <li>Regional Robotics Challenge - April 20th, 2025</li>
        </ul>
      </section>

      <JoinForm clubName="robotics" />

      <footer className="club-footer">
        <p>© 2025 Robotics Club. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default RoboticsClub;