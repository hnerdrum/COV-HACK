import React from 'react';
import MapComponent from './MapComponent';
import WelcomeMessage from './WelcomeMessage';
import Statistics from '../Common/Statistics';
import {useHistory} from "react-router-dom";

const Home = ({ token, db }) => {

    const history = useHistory();

    return (
        <div className="home-wrapper">
            <WelcomeMessage token={token} />
            <MapComponent token={token} db={db} history={history} />
        </div>
    );
};

export default Home;
