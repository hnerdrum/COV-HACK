import React, { useState } from 'react';
import LoginModal from './LoginModal';
import { Button } from 'react-bootstrap';

const Navbar = ({ auth }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <nav className="navbar sticky-top navbar-light">
          <a className="navbar-brand leftMargin10" href="#"><img src="Logo.png" width="50" height="50" alt=""/>   Resource Network</a>
          <Button type="button" className="btn rightMargin10 login-button" onClick={() => setShowModal(!showModal)}>Login</Button>
          {showModal ? <LoginModal setShowModal={setShowModal} auth={auth}/> : null}
        </nav>
    );
};

export default Navbar;
