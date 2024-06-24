import React from 'react';
import Header from "./Header";
import Footer from './Footer';

const Home = () => {
  return (
    <div>
      <Header content="Welcome to the Online Judge"/>
      <p>This is the home page.</p>
      <Footer/>
    </div>
  );
}

export default Home;
