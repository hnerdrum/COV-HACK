import React from 'react';
import MapComponent from './MapComponent';
import WelcomeMessage from './WelcomeMessage';

const Home = () => {
    return (
        <div className="home-wrapper">
            <WelcomeMessage />
            <MapComponent />
        </div>
    );
};

export default Home;
