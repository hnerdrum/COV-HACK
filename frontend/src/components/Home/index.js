import React from 'react';
import MapComponent from './MapComponent';
import WelcomeMessage from './WelcomeMessage';

const Home = ({ login, setLogin }) => {
    return (
        <div className="home-wrapper">
            <WelcomeMessage login={login} />
            <MapComponent />
        </div>
    );
};

export default Home;
