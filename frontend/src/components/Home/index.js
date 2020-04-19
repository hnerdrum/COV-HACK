import React from 'react';
import MapComponent from './MapComponent';
import WelcomeMessage from './WelcomeMessage';
import Statistics from '../Common/Statistics';

const Home = ({ token, db }) => {
    return (
        <div className="home-wrapper">
            <WelcomeMessage token={token} />
            <MapComponent token={token} db={db} />
        </div>
    );
};

export default Home;
