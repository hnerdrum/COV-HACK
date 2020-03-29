import React, { useState } from 'react';
import LoginModal from './LoginModal';
import { Button } from 'react-bootstrap';

const Navbar = ({ auth, loadLogin, setLogin }) => {
    const [showModal, setShowModal] = useState(false);

    const logout = () => {
        localStorage.setItem('login', false);
        setLogin(false);
    };

    const login = loadLogin();

    console.log("navbar " + login);

    return (
        <nav className="navbar sticky-top navbar-light">
          <a className="navbar-brand leftMargin10" href="#"><img src="Logo.png" width="50" height="50" alt=""/>   Resource Network</a>
          {!loadLogin() && <Button type="button" className="btn rightMargin10 login-button" onClick={() => setShowModal(!showModal)}>Login</Button>}
          {loadLogin() && <Button type="button" className="btn rightMargin10 login-button" onClick={() => logout()}>Logout</Button>}
          {showModal ? <LoginModal setShowModal={setShowModal} auth={auth} setLogin={setLogin}/> : null}
        </nav>
    );
};

export default Navbar;
