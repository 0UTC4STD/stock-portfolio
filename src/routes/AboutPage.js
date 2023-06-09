import React from 'react';
import '../styles/AboutPage.css';

const AboutPage = () => {
  return (
    <div className="aboutpage-container">
      <div className="rounded-edge-box">  
      <h1>About</h1>
      <div className="about-section">
        <h4 className="about-paragraph">Welcome to our Stock Portfolio Manager WebApp, designed and developed by Dylan Courtemanche in April 2023 as a Capstone Project for his Software Engineer Certification from the University of South Florida. Our WebApp is built in React and uses MongoDB and Heroku to offer a seamless and secure user experience.</h4>
        <h4 className="about-paragraph">With our Stock Portfolio Manager WebApp, users can easily create an account and login with a JsonWebToken, which is authenticated using our MongoDB Atlas database. Once logged in, users have access to a wide range of features designed to help them manage their stock portfolios.</h4>
        <h4 className="about-paragraph">Our WebApp is linked to Alpha Vantage's Stock API, allowing users to research real-time stock information such as high, low, and current values. In addition, users can "buy" stocks and add them to their portfolio or "sell" stocks and remove them from their portfolio. These features are all designed to help users track and manage their investments with ease and efficiency.</h4>
        <h4 className="about-paragraph">At our Stock Portfolio Manager WebApp, we are committed to providing our users with the tools and resources they need to make informed investment decisions. Whether you're a seasoned investor or just getting started, our WebApp is the perfect solution for managing your stock portfolio. Thank you for choosing our Stock Portfolio Manager WebApp, and we look forward to helping you achieve your investment goals.</h4>
      </div>
    </div>
  </div>
  );
};

export default AboutPage;
