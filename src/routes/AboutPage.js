import React from 'react';

const AboutPage = () => {
  return (
    <div>
      <h1>About</h1>
      <div className="about-section">
        <h2 className="about-heading">Welcome</h2>
        <p className="about-paragraph">To our Stock Portfolio Manager WebApp, designed and developed by Dylan Courtemanche in April 2023 as a Capstone Project for his Software Engineer Certification from the University of South Florida. Our WebApp is built in React and uses MongoDB and Heroku to offer a seamless and secure user experience.</p>

        <h2 className="about-heading">Features</h2>
        <p className="about-paragraph">With our Stock Portfolio Manager WebApp, users can easily create an account and login with a JsonWebToken, which is authenticated using our MongoDB Atlas database. Once logged in, users have access to a wide range of features designed to help them manage their stock portfolios.</p>

        <p className="about-paragraph">Our WebApp is linked to Alpha Vantage's Stock API, allowing users to research real-time stock information such as high, low, and current values. In addition, users can "buy" stocks and add them to their portfolio or "sell" stocks and remove them from their portfolio. These features are all designed to help users track and manage their investments with ease and efficiency.</p>

        <h2 className="about-heading">Mission</h2>
        <p className="about-paragraph">At our Stock Portfolio Manager WebApp, we are committed to providing our users with the tools and resources they need to make informed investment decisions. Whether you're a seasoned investor or just getting started, our WebApp is the perfect solution for managing your stock portfolio. Thank you for choosing our Stock Portfolio Manager WebApp, and we look forward to helping you achieve your investment goals.</p>
      </div>
    </div>
  );
};

export default AboutPage;
