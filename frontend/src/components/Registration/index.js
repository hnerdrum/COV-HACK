import React from 'react';
import styles from "./Registration.module.css";
import ContactInfo from "./ContactInfo";
import Inventory from "./Inventory";
import {reduxForm} from "redux-form";
import {Button} from "react-bootstrap";

const Registration = ({ handleSubmit, auth, reset }) => {
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <h1>Registration Form</h1>
            </div>
            <form onSubmit={handleSubmit} className="form">
                <ContactInfo auth={auth}/>
                <Inventory />
                <div className={styles.buttonContainer}>
                    <Button type="submit" className={styles.submit} variant="primary" size="lg">
                        Register
                    </Button>
                    <Button className={styles.reset} variant="secondary" onClick={reset} size="lg">
                        Reset
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default reduxForm({
    form: 'register',
})(Registration);
