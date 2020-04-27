import React from 'react';
import styles from "./Registration.module.css";
import ContactInfo from "./ContactInfo";
import Inventory from "./Inventory";
import {reduxForm} from "redux-form";
import {Button} from "react-bootstrap";
import * as firebase from "firebase";
import Geocode from "react-geocode";
import AlertModal from "../Common/AlertModal";

const Registration = ({ handleSubmit, auth, db, setToken, setCoordinates, showModal, setShowModal, reset }) => {

    const submit = async (values) => {
        const { password, passwordRepeat, ...registrationData } = values;
        registrationData.createdAt = firebase.firestore.FieldValue.serverTimestamp();

        const authData = {
            email: registrationData.email,
            password
        };

       const data = fixAddress(registrationData);

       const emailResponse = await validateEmail(authData);
       if(emailResponse === undefined || emailResponse.length === 0) {
           await addUserToFireBase(authData);
           const addressResponse = await getLocationAndRegisterData(data.hospitalAddress);
           coordinates(addressResponse, data);
           await addRegistrationToFirebase(data);
           setToken(auth);
       }
       else {
           setShowModal(true);
       }
    };

    const fixAddress = (data) => {
        data.hospitalAddress = data.hospitalAddress + " " + data.posttown + " " + data.postcode;
        delete data.posttown;
        delete data.postcode;

        return data;
    };

    const coordinates = (response, data) => {
        const { lat, lng } = response.results[0].geometry.location;
        data.lat = lat;
        data.lng = lng;
        setCoordinates(lat, lng);
    };

    const validateEmail = async (authData) => {
        auth.fetchSignInMethodsForEmail(authData.email).then((response) => {
            return response;
        })
    };

    const addUserToFireBase = async (credentials) => {
        const { email, password } = credentials;
        return auth.createUserWithEmailAndPassword(email, password);
    };

    const getLocationAndRegisterData = async (address) => {
        return Geocode.fromAddress(address);
    };

    const addRegistrationToFirebase = async (registration) => {
        return db.collection("hospitals").add(registration);
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
