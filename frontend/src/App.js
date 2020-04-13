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
    return localStorage.getItem('token');
  };

  const token = loadLoginState();

  return (
      <BrowserRouter>
        <div>
          <Navbar auth={auth} token={token} />
          <Switch>
            <Route path="/"
                   render={(props) => <Home {...props} token={token} db={db} />}
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
