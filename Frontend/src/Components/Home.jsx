import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Header from './Header';
import Footer from './Footer';
import './Home.css'; // Import your custom styles for Home page

const Home = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleGetStartedClick = () => {
    navigate('/Register'); // Navigate to the Signup page
  };

  const handlePracticeProblemsClick = () => {
    navigate('/problems'); // Navigate to the Problems page
  };

  return (
    <div className="home-container">
      <Header content="Welcome to the Online Judge" />
      <section className="hero-section">
        <div className="hero-content">
          <h1>Solve Challenges, Sharpen Skills</h1>
          <p>Join our community of problem solvers and programmers.</p>
          <button className="cta-button" onClick={handleGetStartedClick}>Get Started</button>
        </div>
        {/* Add background animations or effects here */}
      </section>

      <section className="features-section">
        <div className="feature" onClick={handlePracticeProblemsClick}>
          <h2>Practice Problems</h2>
          <p>Choose from a variety of coding challenges to improve your skills.</p>
        </div>
        <div className="feature">
          <h2>Coding Contests</h2>
          <p>Compete in live contests and measure your coding prowess.</p>
        </div>
        {/* Add more feature cards or sections as needed */}
      </section>

      <section className="testimonial-section">
        <h2>What Our Users Say</h2>
        <div className="testimonial-carousel">
          {/* Implement a carousel component with user testimonials */}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;




