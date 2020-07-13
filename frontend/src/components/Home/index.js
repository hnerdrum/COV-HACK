import React from 'react';
import MapComponent from './MapComponent';
import WelcomeMessage from './WelcomeMessage';
import BrowseCategories from './BrowseCategories';
import Statistics from '../Common/Statistics';
import {useHistory} from "react-router-dom";

const Home = ({ token, db }) => {

    const history = useHistory();

    return (
        <div className="home-wrapper">
            <WelcomeMessage token={token} history={history}/>
            <BrowseCategories />
         </div>
    );
};

export default Home;
