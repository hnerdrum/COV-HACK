import React from 'react';
import './App.css';
import Home from './components/Home';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Registration from "./components/Registration";
import Profile from "./components/Profile";

const App = ({ handle, auth }) => {
  return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" component={Home} exact/>
            <Route
                path="/register"
                render={(props) => <Registration {...props} onSubmit={handle} auth={auth} />}
            />
              <Route path="/profile" component={Profile}/>
          </Switch>
        </div>
      </BrowserRouter>
  );
};

export default App;
