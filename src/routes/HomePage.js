import React from 'react';
import '../styles/HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage-container">
      <div className="outlined-rectangle">
        <h1>Welcome to the Homepage</h1>
        <p>
          You have successfully logged in! To get started please select a tab
          from the navigation pane above!
        </p>
      </div>
    </div>
  );
};

export default HomePage;