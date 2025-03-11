// src/clubs/RoboticsClub.js
import React, { useState, useEffect } from "react";
import JoinForm from "../components/JoinForm";
import roboticsBanner from "../assets/robotics-banner.jpeg";
import robotArm from "../assets/robot-arm.webp";
import drone from "../assets/drone.jpg";
import sensorBot from "../assets/sensor-bot.webp";

function RoboticsClub() {
  const [tip, setTip] = useState("");
  const [quizResult, setQuizResult] = useState("");
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [darkMode, setDarkMode] = useState(true);
  const [score, setScore] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);

  const projects = [
    { name: "Robotic Arm Controller", image: robotArm },
    { name: "Autonomous Drone", image: drone },
    { name: "Sensor-Based Navigation Bot", image: sensorBot },
  ];

  const tips = [
    "Double-check your wiring before powering on.",
    "Calibrate sensors for accurate readings.",
    "Use modular designs for easy upgrades.",
    "Test your code in a simulator first.",
    "Keep spare parts handy during competitions.",
  ];

  const showTip = () => {
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    setTip(randomTip);
  };

  const checkAnswer = (answer) => {
    if (answer === "b") {
      setQuizResult("✅ Correct! Sensors are essential for autonomy.");
      setScore((prevScore) => prevScore + 10);
      updateLeaderboard(score + 10);
    } else {
      setQuizResult("❌ Incorrect. Try again!");
    }
  };

  const updateLeaderboard = (newScore) => {
    const newLeaderboard = [
      ...leaderboard,
      { score: newScore, date: new Date().toLocaleString() },
    ];
    newLeaderboard.sort((a, b) => b.score - a.score);
    setLeaderboard(newLeaderboard.slice(0, 5));
    localStorage.setItem(
      "roboticsLeaderboard",
      JSON.stringify(newLeaderboard.slice(0, 5))
    );
  };

  useEffect(() => {
    const savedLeaderboard =
      JSON.parse(localStorage.getItem("roboticsLeaderboard")) || [];
    setLeaderboard(savedLeaderboard);
  }, []);

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
        <img src={roboticsBanner} alt="Robotics Club Banner" className="club-banner" />
        <h1>Robotics Club</h1>
        <div className="club-clock">{time}</div>
        <button className="btn toggle-btn" onClick={toggleDarkMode}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </header>

      <section className="club-section">
        <h2>About Robotics Club</h2>
        <p>
          The Robotics Club is dedicated to designing, building, and programming
          robots for competitions and real-world applications. Whether you're a
          beginner or an expert, join us to explore robotics through hands-on
          projects and teamwork!
        </p>
        <h3>Club President</h3>
        <p>Naseef Muhamad</p>
        <h3>Participants</h3>
        <ul>
          <li>Jack White</li>
          <li>Kelly Green</li>
          <li>Liam Black</li>
          <li>Sophia Patel (Electronics Lead)</li>
          <li>Ethan Brooks (Programming Lead)</li>
        </ul>
      </section>

      <section className="club-section">
        <h2>Featured Projects</h2>
        <p>Check out some of our recent creations:</p>
        <div className="project-gallery">
          {projects.map((project, index) => (
            <div key={index} className="project-item">
              <img src={project.image} alt={project.name} className="project-image" />
              <p>{project.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="club-section">
        <h2>Robotics Tips</h2>
        <p>Click the button below to get a random robotics tip!</p>
        <button className="btn" onClick={showTip}>
          Get a Tip
        </button>
        <p className="tip-text">{tip}</p>
      </section>

      <section className="club-section">
        <h2>Robotics Quiz</h2>
        <p>
          <strong>Question:</strong> What component is most critical for a
          robot to navigate autonomously?
        </p>
        <div className="quiz-buttons">
          <button className="btn" onClick={() => checkAnswer("a")}>
            A. Bright LEDs
          </button>
          <button className="btn" onClick={() => checkAnswer("b")}>
            B. Sensors
          </button>
          <button className="btn" onClick={() => checkAnswer("c")}>
            C. Extra Batteries
          </button>
        </div>
        <p
          className="quiz-result"
          style={{ color: quizResult.includes("Correct") ? "green" : "red" }}
        >
          {quizResult}
        </p>
      </section>

      <section className="club-section">
        <h2>Leaderboard 🏆</h2>
        <p>
          Your Score: <strong>{score}</strong>
        </p>
        <ol>
          {leaderboard.map((entry, index) => (
            <li key={index}>
              {entry.score} points - {entry.date}
            </li>
          ))}
        </ol>
      </section>

      <JoinForm clubName="robotics" />

      <footer className="club-footer">
        <p>© 2025 Robotics Club. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default RoboticsClub;