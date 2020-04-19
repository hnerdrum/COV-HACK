import React, {useState} from 'react';
import './App.css';
import Home from './components/Home';
import Footer from './components/Common/Footer';
import Navbar from './components/Common/Navbar';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Registration from "./components/Registration";
import Transaction from "./components/Transaction";

const App = ({ auth, db }) => {

  const [showModal, setShowModal] = useState(false);

  const setToken = (auth) => {
    auth.currentUser.getIdToken(true).then((idToken) => {
      localStorage.setItem('token', idToken);
      window.location.assign("/");
    })
        .catch((error) => {
          console.log(error);
        })
  };

  const setCoordinates = (lat, lng) => {
    localStorage.setItem('lat', lat);
    localStorage.setItem('lng', lng);
  };

  const loadLoginState = () => {
    return localStorage.getItem('token');
  };

  const token = loadLoginState();

  return (
      <BrowserRouter>
        <div>
          <Navbar auth={auth} db={db} token={token} setToken={setToken} setCoordinates={setCoordinates}/>
          <Switch>
            <Route path="/"
                   render={(props) => <Home {...props} token={token} db={db} />}
                   exact
            />
            <Route
                path="/register"
                render={(props) => <Registration {...props} auth={auth} db={db} setToken={setToken} showModal={showModal} setShowModal={setShowModal}/>}
            />
            <Route
                path="/transaction"
                render={(props) => <Transaction {...props} db={db} />}
            />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
  );
};

export default App;
