import React from 'react';

export const About = () => {
    return (
        <div className="container about-wrapper">
            <div className="about-title">
                <b className="about-sub-title">Our mission</b>
                <h5 className="shallow">Connecting providers of scrap metal with scrap yards</h5>
            </div>
            <div className="about-body">
                <div className="about-img">
                    <img src="about.jpg" height="400px" width="100%" />
                </div>
                <div className="about-text">
                    <p className="about-text-text">
                        We're living in a time were sustainablity is increasingly important for the health of our planet.
                        A huge part of this is to reuse or repurpose materials from old buildings and left over scrap from factories.
                        Our mission is match demolition companies and factories to their ideal scrap yards.
                    </p>
                    <p className="about-text-text">
                        Our platform gives scrap metal providers an easy way of getting rid of their scrap while getting paid a competitive price.
                        By using our platform the providers can reduce the time spent on administration, but at the same time get paid as much as they were before.
                        Scrap yards can easily browse through the available scrap on the market and find the deals that suit them the best.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default About;