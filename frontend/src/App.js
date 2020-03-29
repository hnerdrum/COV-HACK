import React from 'react';
import './App.css';
import Home from './components/Home';
import Footer from './components/Common/Footer';
import Navbar from './components/Common/Navbar';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Registration from "./components/Registration";
import Profile from "./components/Profile";

const App = ({ handle, auth }) => {
  return (
      <BrowserRouter>
        <div>
          <Navbar />
          <Switch>
            <Route path="/" component={Home} exact/>
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
