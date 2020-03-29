import React, {useState} from 'react';
import './App.css';
import Home from './components/Home';
import Footer from './components/Common/Footer';
import Navbar from './components/Common/Navbar';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Registration from "./components/Registration";
import Profile from "./components/Profile";

const App = ({ handle, auth }) => {

  const loadLoginState = () => {
    return localStorage.getItem('login');
  };

  const setLoginState = (bool) => {
    console.log("here");
    localStorage.setItem('login', bool);
    window.location.reload();
  };

  const login = loadLoginState();

  return (
      <BrowserRouter>
        <div>
          <Navbar auth={auth} login={login} loadLogin={loadLoginState} setLogin={setLoginState}/>
          <Switch>
            <Route path="/"
                   render={(props) => <Home {...props} login={login} setLogin={setLoginState} />}
            />
            <Route
                path="/register"
                render={(props) => <Registration {...props} onSubmit={handle} auth={auth} />}
            />
            <Route path="/profile" component={Profile}/>
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
  );
};

export default App;
