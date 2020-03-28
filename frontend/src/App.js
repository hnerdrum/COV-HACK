import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Registration from "./components/Registration";

const App = ({ handle }) => {
  return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" component={Home} exact/>
            <Route
                path="/register"
                render={(props) => <Registration {...props} onSubmit={handle} />}
            />
          </Switch>
        </div>
      </BrowserRouter>
  );
};

export default App;
