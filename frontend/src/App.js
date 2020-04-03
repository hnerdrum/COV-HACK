import React, {useState} from 'react';
import './App.css';
import Home from './components/Home';
import Footer from './components/Common/Footer';
import Navbar from './components/Common/Navbar';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Registration from "./components/Registration";

const App = ({ auth, db }) => {

  const [showModal, setShowModal] = useState(false);

  const loadLoginState = () => {
    return localStorage.getItem('login');
  };

  const setLoginState = (bool) => {
    localStorage.setItem('login', bool);
    window.location.reload();
  };

  const login = loadLoginState();

  return (
      <BrowserRouter>
        <div>
          <Navbar auth={auth} login={login} setLogin={setLoginState}/>
          <Switch>
            <Route path="/"
                   render={(props) => <Home {...props} login={login} db={db}  setLogin={setLoginState} />}
                   exact
            />
            <Route
                path="/register"
                render={(props) => <Registration {...props} auth={auth} db={db} showModal={showModal} setShowModal={setShowModal}/>}
            />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
  );
};

export default App;
