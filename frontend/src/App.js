import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import Footer from './components/Common/Footer';
import Navbar from './components/Common/Navbar';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Registration from "./components/Registration";

function App() {
  return (
      <BrowserRouter>
        <div>
          <Navbar />
          <Switch>
            <Route path="/" component={Home} exact/>
            <Route path="/register" component={Registration}/>
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
  );
}

export default App;
