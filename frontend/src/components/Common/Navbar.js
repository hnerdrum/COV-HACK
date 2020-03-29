import React, { useState } from 'react';
import LoginModal from './LoginModal';

const Navbar = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <nav className="navbar sticky-top navbar-light">
          <a className="navbar-brand leftMargin10" href="#"><img src="Logo.png" width="50" height="50" alt=""/>   Resource Network</a>
          <button type="button" className="btn rightMargin10 login-button" onClick={() => setShowModal(!showModal)}>Login</button>
          {showModal ? <LoginModal setShowModal={setShowModal} /> : null}
        </nav>
    );
};

export default Navbar;
