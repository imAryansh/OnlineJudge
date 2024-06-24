import React from 'react';
import Header from './Header';
import Footer from './Footer';

const About = () => {
  return (
    <div>
      <Header content="About Us"/>
      <p>This is an online judge application where users can submit code and get it judged automatically.</p>
      <Footer/>
    </div>
  );
}

export default About;
