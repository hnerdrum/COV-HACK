import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Registration from "./components/Registration";

function App() {
  return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" component={Home} exact/>
            <Route path="/register" component={Registration}/>
          </Switch>
        </div>
      </BrowserRouter>
  );
}

export default App;
