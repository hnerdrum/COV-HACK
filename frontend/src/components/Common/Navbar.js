import React, { useState, useEffect } from 'react';
import LoginModal from './LoginModal';
import { Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import "./common.css";

const Navbar = ({ auth, db, setToken, setCoordinates, token }) => {
    const location = useLocation();
    const [showModal, setShowModal] = useState(false);
    const [currLoc, setCurrLoc] = useState("");

    const logout = () => {
        localStorage.clear();
        window.location.reload();
    };

    useEffect(() => {
        const pathname = location.pathname;
        setCurrLoc(pathname)
    }, [location])

    const renderLogin = (token) => {
        if(!token) {
            if (currLoc == "/") {
                return (
                    <button type="button" className="btn rightMargin10" id="login-button" onClick={() => setShowModal(!showModal)}>Login</button>
                )
            } else {
                return (
                    <button type="button" className="btn rightMargin10" id="login-button-dark" onClick={() => setShowModal(!showModal)}>Login</button>
                )
            }
        }
        else {
            if (currLoc !== "/"){
                return (
                    <div className="navbar-button-wrapper">
                        <Button type="button" className="btn btn-success rightMargin10" id="logout2" onClick={() => logout()}>Advertise scrap</Button>
                        <Button type="button" className="btn rightMargin10 dark" id="logout_dark" onClick={() => logout()}>Logout</Button>
                    </div>
                ) 
            } else {
                return (
                    <div className="navbar-button-wrapper">
                        <Button type="button" className="btn btn-success rightMargin10" id="logout2" onClick={() => logout()}>Advertise scrap</Button>
                        <Button type="button" className="btn rightMargin10" id="logout" onClick={() => logout()}>Logout</Button>
                    </div>
                )
            }
        }
    };

    if (currLoc !== "/") {
        return (
            <nav className="navbar dark navbar-light">
                <a className="navbar-brand leftMargin10" href="/"><h3>SCRAPPR</h3></a>
                    {renderLogin(token)}
                {showModal && <LoginModal setShowModal={setShowModal} auth={auth} db={db} setToken={setToken} setCoordinates={setCoordinates} />}
            </nav>
        )
    } else {
        return (
            <nav className="navbar navbar-light">
                <a className="navbar-brand leftMargin10" href="/"><h3 className="company_name">SCRAPPR</h3></a>
                    {renderLogin(token)}
                {showModal && <LoginModal setShowModal={setShowModal} auth={auth} db={db} setToken={setToken} setCoordinates={setCoordinates} />}
            </nav>
        )
    }
};

export default Navbar;
