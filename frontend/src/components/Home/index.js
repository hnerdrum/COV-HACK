import React from 'react';
import MapComponent from './MapComponent';
import WelcomeMessage from './WelcomeMessage';

const Home = ({ login, setLogin, db }) => {
    return (
        <div className="home-wrapper">
            <WelcomeMessage login={login} setLogin={setLogin}/>
            <MapComponent db={db} />
        </div>
    );
};

export default Home;
