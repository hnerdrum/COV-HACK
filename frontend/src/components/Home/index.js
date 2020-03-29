import React from 'react';
import MapComponent from './MapComponent';
import WelcomeMessage from './WelcomeMessage';

const Home = ({ db }) => {
  return (
      <div className="home-wrapper">
          <WelcomeMessage />
          <MapComponent db={db} />
      </div>
  );
};

export default Home;
