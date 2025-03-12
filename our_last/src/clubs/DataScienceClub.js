import React, { useState, useEffect } from "react";
import JoinForm from "../components/JoinForm";

import dataViz from "../assets/data-visualization.jpg";
import mlModel from "../assets/ml-model.jpg";
import bigData from "../assets/big-data.webp";

function DataScienceClub() {
  const [tip, setTip] = useState("");
  const [quizResult, setQuizResult] = useState("");
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [darkMode, setDarkMode] = useState(true);
  const [score, setScore] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);

  
  const projects = [
    { name: "Interactive Data Visualization Dashboard", image: dataViz },
    { name: "Machine Learning Prediction Model", image: mlModel },
    { name: "Big Data Analysis Pipeline", image: bigData },
  ];

  
  const tips = [
    "Clean your data before analysis.",
    "Use version control for your code.",
    "Visualize data to spot trends.",
    "Choose the right model for your problem.",
    "Document your findings clearly.",
  ];

  // Function to get a random data science tip
  const showTip = () => {
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    setTip(randomTip);
  };

  // Function to check quiz answer
  const checkAnswer = (answer) => {
    if (answer === "c") {
      setQuizResult("✅ Correct! Cleaning data is the first step.");
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
      "dataScienceLeaderboard",
      JSON.stringify(newLeaderboard.slice(0, 5))
    );
  };


  useEffect(() => {
    const savedLeaderboard =
      JSON.parse(localStorage.getItem("dataScienceLeaderboard")) || [];
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
        
        <h1>Data Science Club</h1>
        <div className="club-clock">{time}</div>
        <button className="btn toggle-btn" onClick={toggleDarkMode}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </header>

      <section className="club-section">
        <h2>About Data Science Club</h2>
        <p>
          The Data Science Club is all about exploring data analysis, machine
          learning, and visualization. Join us to work on real-world datasets,
          build predictive models, and share insights with a community of
          data enthusiasts!
        </p>
        <h3>Club President</h3>
        <p>Jada Francis</p>
        <h3>Participants</h3>
        <ul>
          <li>Bob Johnson</li>
          <li>Clara Lee</li>
          <li>David Kim</li>
          <li>Emma Wong (Stats Lead)</li>
          <li>Michael Ortiz (ML Lead)</li>
        </ul>
      </section>

      <section className="club-section">
        <h2>Featured Projects</h2>
        <p>Explore some of our recent work:</p>
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
        <h2>Data Science Tips</h2>
        <p>Click the button below to get a random data science tip!</p>
        <button className="btn" onClick={showTip}>
          Get a Tip
        </button>
        <p className="tip-text">{tip}</p>
      </section>

      <section className="club-section">
        <h2>Data Science Quiz</h2>
        <p>
          <strong>Question:</strong> What’s the first step in a data science project?
        </p>
        <div className="quiz-buttons">
          <button className="btn" onClick={() => checkAnswer("a")}>
            A. Build a model
          </button>
          <button className="btn" onClick={() => checkAnswer("b")}>
            B. Visualize the data
          </button>
          <button className="btn" onClick={() => checkAnswer("c")}>
            C. Clean the data
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

      <JoinForm clubName="datascience" />

      <footer className="club-footer">
        <p>© 2025 Data Science Club. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default DataScienceClub;