import React from 'react';
import styles from "./Registration.module.css";
import ContactInfo from "./ContactInfo";
import Inventory from "./Inventory";
import {reduxForm} from "redux-form";
import {Button} from "react-bootstrap";
import * as firebase from "firebase";
import Geocode from "react-geocode";
import AlertModal from "../Common/AlertModal";

const Registration = ({ handleSubmit, auth, db, showModal, setShowModal, reset }) => {

    const submit = (values) => {
        const { password, passwordRepeat, ...registrationData } = values;
        registrationData.createdAt = firebase.firestore.FieldValue.serverTimestamp();

        const authData = {
            email: registrationData.email,
            password
        };

       validateEmail(authData, registrationData);
    };

    const validateEmail = (authData, registrationData) => {
        auth.fetchSignInMethodsForEmail(authData.email).then((response) => {
            if(response === undefined || response.length === 0) {
                getLocationAndRegisterData(registrationData.hospitalAddress, registrationData);
                addUserToFireBase(authData);
            }
            else {
                setShowModal(true);
            }
        })
    };

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
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((response) => {
                localStorage.setItem('login', true);
                window.location.assign("/");
            })
            .catch((error) => {
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

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <h1>Registration Form</h1>
            </div>
            <form onSubmit={handleSubmit(submit)} className="form">
                <ContactInfo auth={auth}/>
                <Inventory />
                <div className={styles.buttonContainer}>
                    <Button type="submit" className={styles.submit} variant="primary" size="lg">
                        REGISTER
                    </Button>
                    <Button className={styles.reset} variant="secondary" onClick={reset} size="lg">
                        RESET
                    </Button>
                </div>
            </form>
            {showModal ? <AlertModal setShowModal={setShowModal} text="Email is already taken. Please try again."/> : null}
        </div>
    );
};

export default reduxForm({
    form: 'register',
})(Registration);
