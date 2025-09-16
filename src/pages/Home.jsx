import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="container">
      <h1 className="main-title">Welcome to My Projects 🚀</h1>
      <p className="subtitle">Explore the different projects below:</p>

      <div className="projects-grid">
        <Link to="/project-one" className="project-card">
          <h2 className="project-title">📝 To-Do List</h2>
          <p className="project-description">Stay organized with tasks.</p>
        </Link>
        <Link to="/project-two" className="project-card">
          <h2 className="project-title">☀️ Weather App</h2>
          <p className="project-description">Check the latest weather updates.</p>
        </Link>
        <Link to="/project-three" className="project-card">
          <h2 className="project-title">🛒 Shopping Frontend</h2>
          <p className="project-description">Modern shopping website UI.</p>
        </Link>
        <Link to="/project-four" className="project-card">
          <h2 className="project-title">♟️ Chess Game</h2>
          <p className="project-description">Challenge yourself with chess.</p>
        </Link>
        <Link to="/project-five" className="project-card">
          <h2 className="project-title">🔮 Project 5</h2>
          <p className="project-description">Coming soon...</p>
        </Link>
      </div>
    </div>
  );
}