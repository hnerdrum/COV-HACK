import React from 'react';
import styles from "./Registration.module.css";
import ContactInfo from "./ContactInfo";
import Inventory from "./Inventory";
import {reduxForm} from "redux-form";

const Registration = ({ handleSubmit }) => {
    return (
        <div className={styles.container}>
            <h1 id={styles.title}>Registration Form</h1>
            <form onSubmit={handleSubmit} className="form">
                <ContactInfo/>
                <Inventory/>
                <button className={styles.submit} type="submit">
                    Register
                </button>
            </form>
        </div>
    );
};

export default reduxForm({
    form: 'register',
})(Registration);
