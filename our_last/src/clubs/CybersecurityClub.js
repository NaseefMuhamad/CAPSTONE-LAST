import React, { useState, useEffect } from "react";
import JoinForm from "../components/JoinForm";
import clubLogo from "../assets/assets/logo.jpg";
import cyberThreatsImage from "../assets/threats.jpg";
import tipsImage from "../assets/tips.jpg";
import quizImage from "../assets/quiz.jpg";

function CybersecurityClub() {
  // State variables
  const [tip, setTip] = useState("");
  const [quizResult, setQuizResult] = useState("");
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [darkMode, setDarkMode] = useState(true);
  const [score, setScore] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);

  // Cyber Security Threats
  const threats = [
    "Phishing Attacks",
    "Malware & Ransomware",
    "Denial of Service (DoS) Attacks",
    "Man-in-the-Middle (MITM) Attacks",
    "Weak Password Attacks",
  ];

  // Cyber Security Tips
  const tips = [
    "Use strong and unique passwords.",
    "Enable two-factor authentication (2FA).",
    "Do not click on suspicious links.",
    "Keep your software and antivirus updated.",
    "Use a VPN on public Wi-Fi.",
    "Back up your data frequently.",
  ];

  // Function to get a random cyber security tip
  const showTip = () => {
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    setTip(randomTip);
  };

  // Function to check quiz answer
  const checkAnswer = (answer) => {
    if (answer === "c") {
      setQuizResult("✅ Correct! Always use a strong, unique password.");
      setScore((prevScore) => prevScore + 10);
      updateLeaderboard(score + 10);
    } else {
      setQuizResult("❌ Incorrect. Try again!");
    }
  };

  // Update leaderboard in local storage
  const updateLeaderboard = (newScore) => {
    const newLeaderboard = [
      ...leaderboard,
      { score: newScore, date: new Date().toLocaleString() },
    ];
    newLeaderboard.sort((a, b) => b.score - a.score);
    setLeaderboard(newLeaderboard.slice(0, 5));
    localStorage.setItem(
      "cybersecurityLeaderboard",
      JSON.stringify(newLeaderboard.slice(0, 5))
    );
  };

  // Load leaderboard from local storage on mount
  useEffect(() => {
    const savedLeaderboard =
      JSON.parse(localStorage.getItem("cybersecurityLeaderboard")) || [];
    setLeaderboard(savedLeaderboard);
  }, []);

  // Real-time clock effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Toggle Dark/Light Mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`club-page ${darkMode ? "dark-mode" : "light-mode"}`}>
      <header className="club-header">
        <img src={clubLogo} alt="Cybersecurity Club Logo" className="club-logo" />
        <h1>Cybersecurity Club</h1>
        <div className="club-clock">{time}</div>
        <button className="btn toggle-btn" onClick={toggleDarkMode}>
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>
      </header>

      <section className="club-section">
        <h2>What is Cyber Security?</h2>
        <p>
          Cyber security protects systems, networks, and data from cyber
          threats such as hacking, phishing, and malware attacks.
        </p>
        <h3>Club President</h3>
        <p>Eve Brown</p>
        <h3>Participants</h3>
        <ul>
          <li>Frank Miller</li>
          <li>Grace Chen</li>
          <li>Henry Davis</li>
        </ul>
      </section>

      <section className="club-section">
        <h2>Common Cyber Threats</h2>
        <img src={cyberThreatsImage} alt="Cyber Threats" className="club-image" />
        <ul>
          {threats.map((threat, index) => (
            <li key={index}>{threat}</li>
          ))}
        </ul>
      </section>

      <section className="club-section">
        <h2>Cyber Security Tips</h2>
        <img src={tipsImage} alt="Cybersecurity Tips" className="club-image" />
        <p>Click the button below to get a random cyber security tip!</p>
        <button className="btn" onClick={showTip}>
          Get a Tip
        </button>
        <p className="tip-text">{tip}</p>
      </section>

      <section className="club-section">
        <h2>Cyber Security Quiz</h2>
        <img src={quizImage} alt="Cybersecurity Quiz" className="club-image" />
        <p>
          <strong>Question:</strong> What is the best way to protect your
          password?
        </p>
        <div className="quiz-buttons">
          <button className="btn" onClick={() => checkAnswer("a")}>
            A. Use the same password everywhere
          </button>
          <button className="btn" onClick={() => checkAnswer("b")}>
            B. Share it with a friend
          </button>
          <button className="btn" onClick={() => checkAnswer("c")}>
            C. Use a unique and strong password
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

      <JoinForm clubName="cybersecurity" />

      <footer className="club-footer">
        <p>© 2025 Cybersecurity Club. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default CybersecurityClub;
