// src/clubs/RoboticsClub.js
import React, { useState, useEffect } from "react";
import { BASE_URL } from '../config';
import roboticsBanner from '../assets/RoboticsBanner.jpg';
import gearIcon from '../assets/GearIcon.webp'; // Renamed to match case
import robotEvent from '../assets/RobotEvent.jpeg'; // Renamed to match case

function RoboticsClub() {
  const [data, setData] = useState({ tips: [], events: [] });
  const [tip, setTip] = useState("");
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    fetch(`${BASE_URL}/api/clubs/robotics`)
      .then((response) => response.json())
      .then((jsonData) => setData(jsonData))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const showTip = () => {
    const randomTip = data.tips[Math.floor(Math.random() * data.tips.length)];
    setTip(randomTip);
  };

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
        <h2><img src={gearIcon} alt="Gear Icon" className="club-icon" />What is Robotics Club?</h2>
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
        <h2><img src={gearIcon} alt="Tips Icon" className="club-icon" />Robotics Tips</h2>
        <p>Click below for a random tip to up your robotics game!</p>
        <button className="btn" onClick={showTip}>Get a Tip</button>
        <p className="tip-text">{tip}</p>
      </section>

      <section className="club-section">
        <h2><img src={gearIcon} alt="Events Icon" className="club-icon" />Upcoming Events</h2>
        <ul>
          <li><img src={robotEvent} alt="Build Event" className="club-event-img" />Robot Build Workshop - April 5th, 2025</li>
          <li><img src={robotEvent} alt="Prep Event" className="club-event-img" />Competition Prep - April 12th, 2025</li>
          <li><img src={robotEvent} alt="Challenge Event" className="club-event-img" />Regional Robotics Challenge - April 20th, 2025</li>
        </ul>
      </section>

      

      <footer className="club-footer">
        <p>© 2025 Robotics Club. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default RoboticsClub;