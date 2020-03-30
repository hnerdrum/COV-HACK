import React from 'react';
import MapComponent from './MapComponent';
import WelcomeMessage from './WelcomeMessage';
import Statistics from '../Common/Statistics';

const Home = ({ login, setLogin, db }) => {
    return (
        <div className="home-wrapper">
            <WelcomeMessage login={login} setLogin={setLogin}/>
            <MapComponent db={db} />
            <Statistics />
        </div>
    );
};

export default Home;
