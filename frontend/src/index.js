import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { reducer as formReducer } from 'redux-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import Geocode from "react-geocode";

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
const db = firebase.firestore();

Geocode.setApiKey("AIzaSyAy1ECBsY8rGy4YiaRzbjqdHuIiwA6Lj08");

Geocode.setLanguage("en");

const rootReducer = combineReducers({
    form: formReducer,
});

const store = createStore(rootReducer);

const addRegistrationToFirebase = (registration) => {
    db.collection("hospitals").add(registration)
        .then((docRef) => {
            console.log("Document written with ID: " + docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: " + error);
        })
};

const addUserToFireBase = (credentials) => {
    const { email, password } = credentials;
    firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
        console.log("User registration failed with error: " + error);
    });
};

const getLocationAndRegisterData = (address, data) => {
    Geocode.fromAddress(address).then(
        response => {
            const { lat, lng } = response.results[0].geometry.location;
            data.lat = lat;
            data.lng = lng;
            addRegistrationToFirebase(data);
        },
        error => {
            console.error(error);
        }
    );
};

const handleRegistration = () => {
    const data = store.getState().form.register.values;

    const { email, password, passwordRepeat, ...registrationData } = data;

    const authData = {
      email,
      password
    };

    getLocationAndRegisterData(registrationData.hospitalAddress, registrationData);
    addUserToFireBase(authData);

};

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <App handle={handleRegistration}/>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
