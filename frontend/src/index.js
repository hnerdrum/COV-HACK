import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import Geocode from "react-geocode";
import { rootReducer } from "./reducers";
import thunkMiddleware from 'redux-thunk';

const firebaseConfig = {
    apiKey: "AIzaSyDLQv5bl1Pyr4i5qx6EPDk617mNraEBi1g",
    authDomain: "cov-hack.firebaseapp.com",
    databaseURL: "https://cov-hack.firebaseio.com",
    projectId: "cov-hack",
    storageBucket: "cov-hack.appspot.com",
    messagingSenderId: "419862169263",
    appId: "1:419862169263:web:965e6d61f447fdc7fef65a",
    measurementId: "G-1D118NFGGH"
};
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
const auth = firebase.auth();

Geocode.setApiKey("AIzaSyAy1ECBsY8rGy4YiaRzbjqdHuIiwA6Lj08");

Geocode.setLanguage("en");

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <App db={db} auth={auth}/>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
