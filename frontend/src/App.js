import React from 'react';
import './App.css';
import Home from './components/Home';
import Footer from './components/Common/Footer';
import Navbar from './components/Common/Navbar';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Registration from "./components/Registration";

const App = ({ handle, db }) => {
  return (
      <BrowserRouter>
        <div>
          <Navbar />
          <Switch>
            <Route
                exact path="/"
                render={() => {
                  return <Home db={db} />
                }}
            />
            <Route
                path="/register"
                render={(props) => <Registration {...props} onSubmit={handle} />}
            />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
  );
};

export default App;
