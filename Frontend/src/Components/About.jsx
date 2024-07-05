import React from 'react';
import Header from './Header';
import Footer from './Footer';

const About = () => {
  return (
    <div className="about-page">
      <Header content="About Us"/>
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Our Online Judge Platform</h1>
          <p>Join our community of problem solvers and programmers.</p>
        </div>
      </section>

      <section className="about-container">
        <div className="about-content">
          <p>Welcome to our Online Judge platform, where programmers can hone their skills by solving coding challenges.</p>
          <p>Our platform provides a wide range of programming problems across various difficulty levels, from beginner to advanced.</p>
          <p>Users can submit their solutions in multiple programming languages and receive instant feedback on their code efficiency and correctness.</p>
          <p>Join our community today to improve your coding skills, compete in challenges, and learn from others!</p>
        </div>

        <div className="additional-content">
          <div className="card">
            <h3>Contests</h3>
            <p>Participate in our regular coding contests to challenge yourself and compete with others.</p>
          </div>
          <div className="card">
            <h3>Problems</h3>
            <p>Explore a wide range of coding problems categorized by difficulty and topic.</p>
          </div>
          <div className="card">
            <h3>How to Attempt</h3>
            <p>Learn strategies and tips on how to approach and solve coding problems effectively.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default About;
