// src/clubs/CybersecurityClub.js
import React, { useState, useEffect } from "react";
import { BASE_URL } from '../config';
import cybersecurityBanner from '../assets/CybersecurityBanner.jpg';
import lockIcon from '../assets/LockIcon.jpg'; // Section icon
import quizTrophy from '../assets/QuizTrophy.jpg'; // Quiz icon

function CybersecurityClub() {
  const [data, setData] = useState({ threats: [], tips: [], quiz: {}, leaderboard: [] });
  const [tip, setTip] = useState("");
  const [quizResult, setQuizResult] = useState("");
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [darkMode, setDarkMode] = useState(true);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetch(`${BASE_URL}/api/clubs/cybersecurity`)
      .then((response) => response.json())
      .then((jsonData) => {
        const savedLeaderboard = JSON.parse(localStorage.getItem("cybersecurityLeaderboard")) || jsonData.leaderboard;
        setData({ ...jsonData, leaderboard: savedLeaderboard });
      })
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

  const checkAnswer = (answer) => {
    if (answer === data.quiz.correctAnswer) {
      setQuizResult("✅ Correct! Always use a strong, unique password.");
      setScore((prevScore) => {
        const newScore = prevScore + 10;
        updateLeaderboard(newScore);
        return newScore;
      });
    } else {
      setQuizResult("❌ Incorrect. Try again!");
    }
  };

  const updateLeaderboard = (newScore) => {
    const newEntry = { score: newScore, date: new Date().toLocaleString() };
    fetch(`${BASE_URL}/api/clubs/cybersecurity/leaderboard`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEntry)
    })
      .then((response) => response.json())
      .then((updatedLeaderboard) => {
        setData((prev) => ({ ...prev, leaderboard: updatedLeaderboard }));
        localStorage.setItem("cybersecurityLeaderboard", JSON.stringify(updatedLeaderboard));
      })
      .catch((error) => console.error("Error updating leaderboard:", error));
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  
  return (
    <div className={`club-page ${darkMode ? "dark-mode" : "light-mode"}`}>
      <header className="club-header">
        <h1>Cybersecurity Club</h1>
        <div className="club-clock">{time}</div>
        <button className="btn toggle-btn" onClick={toggleDarkMode}>
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>
      </header>

      <section className="club-banner-section">
        <img src={cybersecurityBanner} alt="Cybersecurity Club Banner" className="club-banner" />
      </section>

      <section className="club-section">
        <h2><img src={lockIcon} alt="Lock Icon" className="club-icon" />What is Cyber Security?</h2>
        <p>
          Cyber security protects systems, networks, and data from cyber threats such as hacking, phishing, and malware attacks.
        </p>
        <h3>Club President</h3>
        <p>Jona Kasule</p>
        <h3>Participants</h3>
        <ul>
          <li>Frank Miller</li>
          <li>Grace Chen</li>
          <li>Henry Davis</li>
        </ul>
      </section>

      <section className="club-section">
        <h2><img src={lockIcon} alt="Threats Icon" className="club-icon" />Common Cyber Threats</h2>
        <ul>
          {threats.map((threat, index) => (
            <li key={index}>{threat}</li>
          ))}
        </ul>
      </section>

      <section className="club-section">
        <h2><img src={lockIcon} alt="Tips Icon" className="club-icon" />Cyber Security Tips</h2>
        <p>Click the button below to get a random cyber security tip!</p>
        <button className="btn" onClick={showTip}>Get a Tip</button>
        <p className="tip-text">{tip}</p>
      </section>

      <section className="club-section">
        <h2><img src={quizTrophy} alt="Quiz Icon" className="club-icon" />Cyber Security Quiz</h2>
        <p>
          <strong>Question:</strong> What is the best way to protect your password?
        </p>
        <div className="quiz-buttons">
          <button className="btn" onClick={() => checkAnswer("a")}>A. Use the same password everywhere</button>
          <button className="btn" onClick={() => checkAnswer("b")}>B. Share it with a friend</button>
          <button className="btn" onClick={() => checkAnswer("c")}>C. Use a unique and strong password</button>
        </div>
        <p className="quiz-result" style={{ color: quizResult.includes("Correct") ? "#10b981" : "#ef4444" }}>
          {quizResult}
        </p>
      </section>

      <section className="club-section">
        <h2><img src={quizTrophy} alt="Leaderboard Icon" className="club-icon" />Leaderboard 🏆</h2>
        <p>Your Score: <strong>{score}</strong></p>
        <ol>
          {leaderboard.map((entry, index) => (
            <li key={index}>{entry.score} points - {entry.date}</li>
          ))}
        </ol>
      </section>

      

      <footer className="club-footer">
        <p>© 2025 Cybersecurity Club. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default CybersecurityClub;