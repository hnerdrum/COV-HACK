import React, { useState } from 'react';
import LoginModal from './LoginModal';
import { Button } from 'react-bootstrap';
import "./common.css";

const Navbar = ({ auth, db, setToken, setCoordinates, token }) => {
    const [showModal, setShowModal] = useState(false);

    const logout = () => {
        localStorage.clear();
        window.location.reload();
    };

    const renderLogin = (token) => {
        if(!token) {
            return (
                <button type="button" className="btn rightMargin10 login-button" onClick={() => setShowModal(!showModal)}>LOGIN</button>
            )
        }
        else {
            return (
                <Button type="button" className="btn rightMargin10" id="logout" onClick={() => logout()}>LOGOUT</Button>
            )
        }
    };

    return (
        <nav className="navbar sticky-top navbar-light">
          <a className="navbar-brand leftMargin10" href="/"><img src="Logo.png" width="50" height="50" alt=""/>   COVWEB</a>
            {renderLogin(token)}
          {showModal && <LoginModal setShowModal={setShowModal} auth={auth} db={db} setToken={setToken} setCoordinates={setCoordinates} />}
        </nav>
    );
};

export default Navbar;
