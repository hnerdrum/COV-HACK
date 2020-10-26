import React from "react";
import {useHistory} from "react-router-dom";

const Thanks = () => {
    const history = useHistory();

    const goToLanding = () => {
        history.push("/")
    }

    return (
        <div className="container thanks-wrapper">
            <img height="250px" width="auto" src="shipping.png" />
            <h1 className="thanks-headline">
                Thank you.
            </h1>
            <h1 className="thanks-subheader">
                We'll be in contact shortly to arrange a transaction
            </h1>
            <button className="btn btn-info thanks-button" onClick={() => goToLanding()}>Go back to landing page</button>
        </div>
    )
};

export default Thanks;