import React, { useState } from 'react';
import LoginModal from './LoginModal';
import { Button } from 'react-bootstrap';
import "./common.css";

const Navbar = ({ auth, login }) => {
    const [showModal, setShowModal] = useState(false);

    const logout = () => {
        localStorage.setItem('login', false);
        window.location.reload();
    };

    const renderLogin = (login) => {
        if(login == "true") {
            return (
                <Button type="button" className="btn rightMargin10" id="logout" onClick={() => logout()}>LOGOUT</Button>
            )
        }
        else {
            return (
                <button type="button" className="btn rightMargin10 login-button" onClick={() => setShowModal(!showModal)}>LOGIN</button>
            )
        }
    };

    return (
        <nav className="navbar sticky-top navbar-light">
          <a className="navbar-brand leftMargin10" href="/"><img src="Logo.png" width="50" height="50" alt=""/>   COVWEB</a>
            {renderLogin(login)}
          {showModal && <LoginModal setShowModal={setShowModal} auth={auth} />}
        </nav>
    );
};

export default Navbar;
