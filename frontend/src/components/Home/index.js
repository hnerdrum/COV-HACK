import React from 'react';
import WelcomeMessage from './WelcomeMessage';
import AboutSection from "../AboutSection";
import {useHistory} from "react-router-dom";

const Home = ({ token, db }) => {

    const history = useHistory();

    return (
        <div className="home-wrapper">
            <WelcomeMessage token={token} history={history} db={db}/>
            <AboutSection />
         </div>
    );
};

export default Home;
